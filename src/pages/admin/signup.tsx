import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, Building, Upload } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { uploadImage } from "@/utils/imageUpload";

const signupSchema = z
  .object({
    businessName: z.string().min(2, { message: "Business name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

const AdminSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [logo, setLogo] = useState("");
  const navigate = useNavigate();
  const { signUp, createBusiness } = useAuth();
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      businessName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const logoUrl = await uploadImage(file);
      setLogo(logoUrl);
    } catch (error) {
      console.error("Error uploading logo:", error);
      setError("Failed to upload logo. Please try again.");
    }
  };

  const handleSignup = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError("");

    try {
      // Step 1: Sign up the user
      const { data: signUpData, error: signUpError } = await signUp(
        data.email,
        data.password,
      );

      if (signUpError) {
        setError(signUpError.message);
        setIsLoading(false);
        return;
      }

      // Check if email confirmation is required
      if (signUpData?.user && !signUpData.user.confirmed_at) {
        setError(
          "Please check your email to confirm your account before logging in. After confirming, you can log in from the login page.",
        );
        setIsLoading(false);
        return;
      }

      // Step 2: Create the business
      const { error: businessError } = await createBusiness(
        data.businessName,
        logo,
      );

      if (businessError) {
        setError(businessError.message);
        setIsLoading(false);
        return;
      }

      // Success - redirect to dashboard
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(
        err.message || "An error occurred during signup. Please try again.",
      );
      console.error("Signup error:", err);
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
        <Card className="w-full max-w-md mx-auto bg-black border-gold border-2">
          <CardHeader className="space-y-2">
            <div className="flex justify-center mb-4">
              {logo ? (
                <img
                  src={logo}
                  alt="Business Logo"
                  className="h-16 w-auto object-contain"
                />
              ) : (
                <div className="h-16 w-16 bg-gold/20 rounded-full flex items-center justify-center">
                  <Building className="h-8 w-8 text-gold" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-center text-gold">
              Create Your Admin Account
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Set up your business profile and admin access
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-md text-red-300 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-gray-300">
                  Business Name
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Building className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    id="businessName"
                    type="text"
                    placeholder="Your Business Name"
                    className="pl-10 bg-gray-900 border-gray-700 text-white focus:border-gold focus:ring-gold"
                    {...register("businessName")}
                  />
                </div>
                {errors.businessName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.businessName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo" className="text-gray-300">
                  Business Logo (Optional)
                </Label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 bg-gray-900 hover:bg-gray-800"
                    onClick={() =>
                      document.getElementById("logo-upload")?.click()
                    }
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {logo ? "Change Logo" : "Upload Logo"}
                  </Button>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                </div>
                {logo && (
                  <div className="mt-2 flex justify-center">
                    <img
                      src={logo}
                      alt="Logo Preview"
                      className="h-12 object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@yourbusiness.com"
                    className="pl-10 bg-gray-900 border-gray-700 text-white focus:border-gold focus:ring-gold"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-gray-900 border-gray-700 text-white focus:border-gold focus:ring-gold"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-gray-900 border-gray-700 text-white focus:border-gold focus:ring-gold"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gold text-black font-bold"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/admin" className="text-gold hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="text-amber-600 dark:text-gold hover:text-amber-700 dark:hover:text-gold/80 text-sm font-medium transition-colors"
          >
            ← Return to Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
