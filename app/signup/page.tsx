"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userCategory, setUserCategory] = useState("Student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const categories = ["Student", "Teacher", "Administrator"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle signup logic here
    console.log("Signup attempt", { username, email, userCategory, password });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 relative">
        {/* Back Button */}
        <Link 
          href="/" 
          className="absolute left-6 top-6 text-amber-600 hover:text-amber-700 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
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

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="space-y-2">
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-600"
            >
              User Name
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-white border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-white border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* User Category */}
          <div className="space-y-2 relative">
            <label 
              htmlFor="category" 
              className="block text-sm font-medium text-gray-600"
            >
              User Category
            </label>
            <div 
              className="relative"
              onClick={() => setShowCategories(!showCategories)}
            >
              <div className="w-full px-4 py-3 rounded-full bg-white border border-gray-200 flex justify-between items-center cursor-pointer">
                <span>{userCategory}</span>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
              {showCategories && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="px-4 py-2 hover:bg-amber-50 cursor-pointer"
                      onClick={() => {
                        setUserCategory(category);
                        setShowCategories(false);
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-white border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label 
              htmlFor="confirmPassword" 
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-white border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
              placeholder="Confirm your password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 rounded-full text-lg font-medium transition-colors"
          >
            Sign up
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
} 