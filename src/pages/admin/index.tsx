import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/admin/LoginForm";

const AdminLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    <div className="min-h-screen flex items-center justify-center bg-black">
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

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      <div className="relative z-10 w-full max-w-md px-4 py-8">
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-gold hover:text-gold/80 text-sm font-medium transition-colors"
          >
            ← Return to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
