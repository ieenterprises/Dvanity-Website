import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Sidebar from "@/components/admin/Sidebar";
import ContentManager from "@/components/admin/ContentManager";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onLogout?: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [searchParams] = useSearchParams();
  const [selectedSection, setSelectedSection] = useState<string>("hero");
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [businessName, setBusinessName] = useState<string>("Your Business");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const {
    user,
    profile,
    signOut,
    loading: authLoading,
    checkAndRepairUserProfile,
  } = useAuth();

  // Set loading to false immediately when auth loading completes
  useEffect(() => {
    if (!authLoading) {
      setLoading(false);
    }
  }, [authLoading]);

  // Check if user is authenticated
  useEffect(() => {
    console.log(
      "Dashboard effect - User:",
      user,
      "Profile:",
      profile,
      "Loading:",
      loading,
    );

    // Always set a default business name to avoid loading state issues
    setBusinessName("Your Business");

    if (!loading && !user) {
      console.log("No user found, redirecting to login");
      navigate("/admin");
      return;
    }

    // Force loading to false after a short timeout to prevent infinite loading
    const timer = setTimeout(() => {
      if (loading) {
        console.log("Forcing loading state to false after timeout");
        setLoading(false);
      }
    }, 2000);

    // If user exists but no business is associated
    if (user && !profile?.business_id) {
      console.log("User has no business associated, attempting repair...");
      checkAndRepairUserProfile().then((repaired) => {
        if (!repaired) {
          // If repair failed, show error with option to create business
          setError(
            "Your account needs to be associated with a business. Please create one.",
          );
        }
      });
    }

    // Set business name if available
    if (user && profile?.businesses) {
      setBusinessName(profile.businesses.name || "Your Business");
    }

    return () => clearTimeout(timer);
  }, [user, profile, loading, navigate, checkAndRepairUserProfile]);

  // Update selected section based on URL query parameter
  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      setSelectedSection(section);
    }
  }, [searchParams]);

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    // Navigation is now handled directly in the signOut function
    // with a hard redirect to ensure all state is cleared
  };

  // Handle preview mode
  const handlePreview = () => {
    setIsPreviewMode(true);
  };

  // Handle publish changes
  const handlePublish = () => {
    console.log("Publishing changes for section:", selectedSection);
    setHasChanges(false);
    setIsPreviewMode(false);
  };

  // Handle content changes
  const handleContentChange = () => {
    setHasChanges(true);
  };

  // Instead of a full-page loading screen, we'll show a small loading indicator in the header if needed

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-black text-gray-800 dark:text-white overflow-hidden transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 m-4 rounded-md">
            {error}
            <div className="mt-2">
              <Button
                onClick={() => navigate("/admin/signup")}
                className="bg-gold text-black font-bold mr-2"
              >
                Create Business
              </Button>
              <Button
                onClick={() => setError("")}
                variant="outline"
                className="border-red-500 text-red-300"
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}

        {/* Header with status indicators */}
        <header className="h-16 border-b border-gray-200 dark:border-gold/20 flex items-center justify-between px-6 bg-white dark:bg-black transition-colors duration-200">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-amber-600 dark:text-gold">
              {businessName} Dashboard
            </h1>
            <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
              Editing:{" "}
              <span className="text-amber-600 dark:text-gold">
                {selectedSection.charAt(0).toUpperCase() +
                  selectedSection.slice(1)}
              </span>
            </span>
            {loading && (
              <div className="ml-4 w-5 h-5 border-2 border-t-gold border-gray-200 rounded-full animate-spin"></div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {hasChanges && (
              <span className="text-sm text-amber-500 flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                Unsaved changes
              </span>
            )}
            {isPreviewMode && (
              <span className="text-sm text-blue-400 flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Preview mode
              </span>
            )}
          </div>
        </header>

        {/* Content Manager */}
        <main className="flex-1 overflow-hidden">
          <ContentManager
            selectedSection={selectedSection}
            onPreview={handlePreview}
            onPublish={handlePublish}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
