import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/admin/LoginForm";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogin = async (values: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock authentication - in a real app, this would call an auth API
      if (
        values.email === "admin@dvanity.com" &&
        values.password === "password123"
      ) {
        // Store auth state (would use a proper auth context in a real app)
        localStorage.setItem("isAuthenticated", "true");
        if (values.rememberMe) {
          localStorage.setItem("rememberAdmin", "true");
        }

        // Redirect to dashboard
        navigate("/admin/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error("Login error:", err);
    } finally {
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
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />

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
