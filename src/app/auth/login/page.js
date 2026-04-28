"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "@/app/contexts/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://donjay-server-mw7v-4klcotyzr-jaytechs-projects-e325c32a.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        toast.error(
          res.status === 400
            ? "Invalid email or password"
            : "Something went wrong"
        );
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      // Check role
      if (data.role === "admin") {
        toast.error("Admins must log in through the admin Login Page.");
        setTimeout(() => {
          window.location.href = "/Admin/Access/Login";
        }, 1500);
        setLoading(false);
        return;
      }

      toast.success("Login successful");
      login(data);
      window.location.href = "/";
    } catch (error) {
      console.error("Server error:", error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="py-4 md:py-6 px-4 flex justify-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-28 md:w-35 h-auto object-contain"
          />
        </div>

        <div className="px-5 md:px-8 py-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-black mb-2">
            Customer Log In
          </h1>
          <p className="text-gray-500 text-center text-sm md:text-base mb-4 md:mb-6">
            Please enter your details to log in
          </p>

          <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium mb-2 text-black"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-lightgrey rounded focus:outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2 text-black"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-lightgrey rounded focus:outline-none transition-colors duration-300 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex flex-row justify-between items-start xs:items-center gap-2 mt-3 text-xs">
              <div className="flex items-center gap-2">
                <input
                  required
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 border border-gray-400 rounded focus:ring-0"
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a
                href="/auth/forgotpassword"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors xs:self-center"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 mt-2`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-3 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Don&apos;t have an account?{" "}
              <a
                href="/auth/register"
                className="font-medium text-blue hover:text-blue-800 transition-colors"
              >
                Sign Up Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
