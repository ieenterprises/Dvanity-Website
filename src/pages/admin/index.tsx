import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../../components/admin/LoginForm";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [businessInfo, setBusinessInfo] = useState<{
    name?: string;
    logo?: string;
  }>({});
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { signIn, user, profile, checkAndRepairUserProfile } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    console.log("Login page effect - User:", user, "Profile:", profile);
    if (user) {
      // Redirect to dashboard even if no business is associated
      navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (values: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }) => {
    setIsLoading(true);
    setError("");

    try {
      console.log("Attempting login for:", values.email);
      const { data, error } = await signIn(values.email, values.password);

      if (error) {
        setError(error.message);
        console.error("Login error:", error);
        setIsLoading(false);
      } else {
        console.log("Login successful, user:", data?.user);

        // If login is successful, immediately redirect to dashboard
        if (data?.user) {
          // Keep loading state true during redirect
          navigate("/admin/dashboard");
          return; // Exit early to keep loading indicator during navigation
        }

        // Only check for business profile if we haven't redirected yet
        if (data?.user && !profile?.business_id) {
          console.log(
            "No business associated with profile, checking/repairing...",
          );
          const repaired = await checkAndRepairUserProfile();
          if (!repaired) {
            setError(
              "Your account exists but has no business associated. Please try signing up again or contact support.",
            );
          }
        }
        setIsLoading(false);
      }
    } catch (err: any) {
      setError(
        err.message || "An error occurred during login. Please try again.",
      );
      console.error("Login error exception:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black transition-colors duration-200">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=1200&q=80')",
            filter: "blur(3px)",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/90 dark:from-black/80 dark:via-black/70 dark:to-black/90 transition-colors duration-200" />

      <div className="relative z-10 w-full max-w-md px-4 py-8">
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error}
          businessLogo={businessInfo.logo}
          businessName={businessInfo.name}
        />

        <div className="mt-8 flex items-center justify-between">
          <a
            href="/"
            className="text-amber-600 dark:text-gold hover:text-amber-700 dark:hover:text-gold/80 text-sm font-medium transition-colors"
          >
            ← Return to Website
          </a>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-full ${theme === "dark" ? "bg-black/40 border-gold/30 text-gold" : "bg-white border-gray-300 text-gray-700"}`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
