"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Incorrect email or password");
        setPassword(""); // Clear password on error
        return;
      }

      const currentTime = new Date().getTime();
      const expiryTime = currentTime + 30 * 60 * 1000;

      const userData = {
        ...data.user,
        loginTime: currentTime,
        expiryTime,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
      setPassword(""); // Also clear password on unexpected error
    }
  };

  // Auto-clear error after 2 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 relative">
        {/* Back Button */}
        <Link
          href="/"
          className="absolute left-6 top-6 text-teal-600 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>

        {/* Logo */}
        <div className="text-center mb-4">
          <div className="w-32 mx-auto">
            <Image
              src="/images/EG_Logo.png"
              alt="EG Logo"
              width={128}
              height={40}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Error Message */}
        <div className="h-6 mb-4 text-center">
          {error && (
            <p className="text-sm text-red-500 font-medium transition-opacity duration-300 ease-in-out">
              {error}
            </p>
          )}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-white border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-white border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-full text-lg font-medium transition-colors"
          >
            Login
          </Button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
              register here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
