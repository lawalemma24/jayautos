"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "@/app/contexts/AuthContext";
import { apiUrl } from "@/utils/apihelper";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      toast.error("Please fill in all necessary fields");
      return;
    }

    setLoading(true);

    const url = apiUrl("/auth/login");

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        toast.error(
          res.status === 400
            ? "Invalid email or password"
            : "Something went wrong"
        );
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (!data) {
        setLoading(false);
        return;
      }

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

      // Use context login to store user in state and localStorage
      login(data);

      // Redirect to homepage
      window.location.href = "/";
    } catch (error) {
      console.error("Server/fetch error:", error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue/30 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Logo */}
        <div className="py-4 md:py-6 px-4 flex justify-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-28 md:w-36 h-auto object-contain"
          />
        </div>

        {/* Content */}
        <div className="px-5 md:px-8 py-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-black mb-2">
            Admin Login
          </h1>
          <p className="text-gray-500 text-center text-sm md:text-base mb-4 md:mb-6">
            Please enter your details to log in
          </p>

          <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              />
            </div>

            {/* Password */}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Second Password */}
            <div>
              <label
                className="block text-sm font-medium mb-2 text-black"
                htmlFor="secondPassword"
              >
                Second Password
              </label>
              <div className="relative">
                <input
                  id="secondPassword"
                  type={showSecond ? "text" : "password"}
                  placeholder="Enter second password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowSecond(!showSecond)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showSecond ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex justify-between items-center text-sm mt-2">
              <label className="flex items-center gap-2">
                <input
                  required
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 border border-gray-400 rounded focus:ring-0"
                />
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 mt-2"
            >
              Sign in
            </button>

            {/* Divider */}
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-3 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Social logins
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                <FcGoogle size={24} />
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                <FaApple size={24} className="text-black" />
              </button>
            </div> */}
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Don&apos;t have an account?{" "}
              <a
                href="/auth/register"
                className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
