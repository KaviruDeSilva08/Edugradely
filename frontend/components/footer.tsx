"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-teal-700 text-white py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-bold text-lg mb-3 md:mb-4">About Us</h3>
            <p className="text-teal-100 text-sm md:text-base">
              Revolutionizing education with AI-powered grading solutions that save time and improve learning outcomes.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link href="/how-it-works" className="text-teal-100 hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-teal-100 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-teal-100 hover:text-white transition-colors">
                  Log in
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-teal-100 hover:text-white transition-colors">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 md:mb-4">Legal</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link href="/privacy" className="text-teal-100 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-teal-100 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-bold text-lg mb-3 md:mb-4">Contact</h3>
            <p className="text-teal-100 text-sm md:text-base">
              Email: info@edugradely.com<br />
              Support: support@edugradely.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-teal-600 pt-6 md:pt-8">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 md:gap-0">
            <p className="text-teal-100 text-sm md:text-base text-center md:text-left">
              © {new Date().getFullYear()} EduGradely. All rights reserved.
            </p>
            <div className="flex space-x-4 md:space-x-6">
              <a href="#" className="text-teal-100 hover:text-white transition-colors p-1">
                <Facebook className="h-5 w-5 md:h-6 md:w-6" />
              </a>
              <a href="#" className="text-teal-100 hover:text-white transition-colors p-1">
                <Instagram className="h-5 w-5 md:h-6 md:w-6" />
              </a>
              <a href="#" className="text-teal-100 hover:text-white transition-colors p-1">
                <Twitter className="h-5 w-5 md:h-6 md:w-6" />
              </a>
              <a href="#" className="text-teal-100 hover:text-white transition-colors p-1">
                <Mail className="h-5 w-5 md:h-6 md:w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}