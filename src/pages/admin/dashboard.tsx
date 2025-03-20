import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Sidebar from "@/components/admin/Sidebar";
import ContentManager from "@/components/admin/ContentManager";

interface DashboardProps {
  onLogout?: () => void;
}

const Dashboard = ({
  onLogout = () => console.log("Logout clicked"),
}: DashboardProps) => {
  const [searchParams] = useSearchParams();
  const [selectedSection, setSelectedSection] = useState<string>("hero");
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate]);

  // Update selected section based on URL query parameter
  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      setSelectedSection(section);
    }
  }, [searchParams]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("rememberAdmin");
    navigate("/");
  };

  // Handle preview mode
  const handlePreview = () => {
    setIsPreviewMode(true);
  };

  // Handle publish changes
  const handlePublish = () => {
    // In a real implementation, this would save changes to a database
    console.log("Publishing changes for section:", selectedSection);
    setHasChanges(false);
    setIsPreviewMode(false);
  };

  // Handle content changes
  const handleContentChange = () => {
    setHasChanges(true);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-black text-gray-800 dark:text-white overflow-hidden transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with status indicators */}
        <header className="h-16 border-b border-gray-200 dark:border-gold/20 flex items-center justify-between px-6 bg-white dark:bg-black transition-colors duration-200">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-amber-600 dark:text-gold">
              Dashboard
            </h1>
            <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
              Editing:{" "}
              <span className="text-amber-600 dark:text-gold">
                {selectedSection.charAt(0).toUpperCase() +
                  selectedSection.slice(1)}
              </span>
            </span>
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
