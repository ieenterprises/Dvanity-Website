import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: any | null;
  loading: boolean;
  authError: string | null;
  signUp: (
    email: string,
    password: string,
  ) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signOut: () => Promise<void>;
  getCurrentBusiness: () => Promise<any>;
  createBusiness: (
    name: string,
    logo?: string,
  ) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  checkAndRepairUserProfile: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session);
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, session);
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchProfile(session.user.id);
        // If we have a user but no profile, try to repair it
        if (!profile) {
          await checkAndRepairUserProfile();
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from("profiles")
        .select("*, businesses(*)")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      console.log("Profile data:", data);
      setProfile(data);
      return data;
    } catch (err) {
      console.error("Exception in fetchProfile:", err);
      return null;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setAuthError(null);
      console.log("Signing up user:", email);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + "/admin",
        },
      });

      if (error) {
        console.error("Signup error:", error);
        setAuthError(error.message);
        return { data: null, error };
      }

      console.log("Signup successful:", data);

      // Check if email confirmation is required
      if (data?.user && !data.user.confirmed_at) {
        console.log("Email confirmation required");
        return {
          data,
          error: {
            message:
              "Please check your email to confirm your account before logging in.",
          },
        };
      }

      return { data, error: null };
    } catch (err: any) {
      console.error("Exception in signUp:", err);
      setAuthError(err.message || "An unexpected error occurred during signup");
      return { data: null, error: err };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setAuthError(null);
      setLoading(true); // Ensure loading is true when signing in
      console.log("Signing in user:", email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        setAuthError(error.message);
        setLoading(false);
        return { data: null, error };
      }

      console.log("Login successful:", data);

      // After successful login, check and repair profile if needed
      if (data.user) {
        try {
          // Set the user immediately to trigger redirects
          setUser(data.user);
          setSession(data.session);

          // Then fetch profile in background
          const profileData = await fetchProfile(data.user.id);
          console.log("Profile after login:", profileData);

          // If no profile or no business, try to repair
          if (!profileData || !profileData.business_id) {
            console.log("No business ID found, attempting repair");
            await checkAndRepairUserProfile();
          }

          // Ensure loading is set to false after profile is fetched
          setLoading(false);
        } catch (profileErr) {
          console.error("Error handling profile after login:", profileErr);
          // Continue anyway - we'll handle missing profile in the dashboard
          setLoading(false);
        }
      } else {
        setLoading(false);
      }

      return { data, error: null };
    } catch (err: any) {
      console.error("Exception in signIn:", err);
      setAuthError(err.message || "An unexpected error occurred during login");
      setLoading(false);
      return { data: null, error: err };
    }
  };

  const signOut = async () => {
    try {
      setAuthError(null);
      await supabase.auth.signOut();
      setProfile(null);
    } catch (err: any) {
      console.error("Error signing out:", err);
      setAuthError(err.message || "An error occurred during logout");
    }
  };

  const getCurrentBusiness = async () => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("business_id, businesses(*)")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching business:", error);
        return null;
      }

      return data?.businesses;
    } catch (err) {
      console.error("Exception in getCurrentBusiness:", err);
      return null;
    }
  };

  const createBusiness = async (name: string, logo?: string) => {
    if (!user) return { data: null, error: new Error("Not authenticated") };

    try {
      console.log("Creating business:", name, "for user:", user.id);

      // Create the business
      const { data: businessData, error: businessError } = await supabase
        .from("businesses")
        .insert([{ name, logo }])
        .select()
        .single();

      if (businessError) {
        console.error("Error creating business:", businessError);
        return { data: null, error: businessError };
      }

      console.log("Business created:", businessData);

      // Update the user's profile with the business ID and make them an admin
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .upsert([
          {
            id: user.id,
            business_id: businessData.id,
            is_admin: true,
          },
        ])
        .select()
        .single();

      if (profileError) {
        console.error("Error updating profile:", profileError);
        return { data: null, error: profileError };
      }

      console.log("Profile updated:", profileData);

      // Refresh the profile
      await fetchProfile(user.id);

      return { data: businessData, error: null };
    } catch (err: any) {
      console.error("Exception in createBusiness:", err);
      return { data: null, error: err };
    }
  };

  // Function to check and repair user profile if needed
  const checkAndRepairUserProfile = async () => {
    if (!user) return false;

    try {
      console.log("Checking user profile for repairs:", user.id);

      // Check if profile exists
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      // If profile doesn't exist, create it
      if (profileError || !profileData) {
        console.log("Profile not found, creating new profile");

        const { error: insertError } = await supabase
          .from("profiles")
          .insert([{ id: user.id, is_admin: false }]);

        if (insertError) {
          console.error("Error creating profile:", insertError);
          return false;
        }

        console.log("Profile created successfully");
        await fetchProfile(user.id);
        return true;
      }

      console.log("Profile exists, no repair needed");
      return true;
    } catch (err) {
      console.error("Exception in checkAndRepairUserProfile:", err);
      return false;
    }
  };

  const value = {
    session,
    user,
    profile,
    loading,
    authError,
    signUp,
    signIn,
    signOut,
    getCurrentBusiness,
    createBusiness,
    checkAndRepairUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
