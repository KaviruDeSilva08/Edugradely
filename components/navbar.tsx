"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface NavbarProps {
  currentPath?: string;
}

export function Navbar({ currentPath = "/" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="relative flex items-center h-20 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="w-44 h-16 pl-0">
              <Image
                src="/images/EG_Logo.png"
                alt="EG Logo"
                width={176}
                height={64}
                className="w-full h-full object-contain object-left"
                priority
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 ml-4">
            <Link 
              href="/how-it-works" 
              className={`text-base ${
                currentPath === "/how-it-works" 
                  ? "text-gray-900 font-medium" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              How it Works
            </Link>
            <Link 
              href="/about"
              className={`text-base ${
                currentPath === "/about" 
                  ? "text-gray-900 font-medium" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              About
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 ml-auto pr-4">
          <Link href="/login" className="text-gray-600 hover:text-gray-900 text-base">
            Log in
          </Link>
          <Link href="/signup">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full text-base">
              Sign up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="ml-auto mr-4 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link 
                href="/how-it-works" 
                className="text-gray-600 hover:text-gray-900 text-base"
              >
                How it Works
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-gray-900 text-base"
              >
                About
              </Link>
              <Link 
                href="/login" 
                className="text-gray-600 hover:text-gray-900 text-base"
              >
                Log in
              </Link>
              <Link href="/signup">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white w-full rounded-full text-base py-2">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 