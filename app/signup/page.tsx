"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userCategory, setUserCategory] = useState("Student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState("success");

  const categories = ["Student", "Teacher", "Administrator"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match!");
      setModalStatus("error");
      setModalVisible(true);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role: userCategory.toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setModalMessage(data.message || "Signup failed");
        setModalStatus("error");
        setModalVisible(true);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setModalMessage("Signup successful! Redirecting...");
      setModalStatus("success");
      setModalVisible(true);

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (err) {
      console.error(err);
      setModalMessage("An error occurred during signup.");
      setModalStatus("error");
      setModalVisible(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 relative">
        <Link href="/" className="absolute left-6 top-6 text-amber-600 hover:text-amber-700 transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>

        <div className="text-center mb-8">
          <div className="w-32 mx-auto">
            <Image src="/images/EG_Logo.png" alt="EG Logo" width={128} height={40} className="w-full h-auto object-contain" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
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

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
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

          <div className="space-y-2 relative">
            <label htmlFor="category" className="block text-sm font-medium text-gray-600">
              User Category
            </label>
            <div className="relative" onClick={() => setShowCategories(!showCategories)}>
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

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
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

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
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

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
              Log in here
            </Link>
          </p>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
            <h2 className={`text-xl font-semibold ${modalStatus === 'error' ? 'text-red-600' : 'text-green-600'}`}>
              {modalStatus === 'error' ? 'Error' : 'Success'}
            </h2>
            <p className="mt-4">{modalMessage}</p>
            <Button
              className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full"
              onClick={() => setModalVisible(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
