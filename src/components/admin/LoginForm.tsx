import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit?: (values: LoginFormValues) => void;
  isLoading?: boolean;
  error?: string;
  businessLogo?: string;
  businessName?: string;
}

const LoginForm = ({
  onSubmit = () => {},
  isLoading = false,
  error = "",
  businessLogo = "",
  businessName = "Admin Portal",
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { profile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleFormSubmit = (data: LoginFormValues) => {
    onSubmit(data);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-black border-gold border-2">
      <CardHeader className="space-y-2">
        <div className="flex justify-center mb-4">
          {businessLogo ? (
            <img
              src={businessLogo}
              alt={`${businessName} Logo`}
              className="h-16 w-auto object-contain"
            />
          ) : (
            <img
              src="/logo-placeholder.png"
              alt="Business Logo"
              className="h-16 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://api.dicebear.com/7.x/initials/svg?seed=DV&backgroundColor=gold&textColor=black";
              }}
            />
          )}
        </div>
        <CardTitle className="text-2xl font-bold text-center text-gold">
          Admin Login
        </CardTitle>
        <CardDescription className="text-center text-gray-400">
          Enter your credentials to access the admin dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-md text-red-300 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                {...register("rememberMe")}
                className="border-gray-600 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
              />
              <Label htmlFor="rememberMe" className="text-sm text-gray-300">
                Remember me
              </Label>
            </div>
            <Button
              variant="link"
              className="text-gold underline p-0"
              type="button"
            >
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-gold text-black font-bold"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 border-t border-gray-800 pt-4">
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/admin/signup" className="text-gold hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-xs text-gray-500">
          {businessName} © {new Date().getFullYear()}
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
