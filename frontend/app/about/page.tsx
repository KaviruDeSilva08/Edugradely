"use client";

import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#e5f9ff_0%,_transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#f0f7ff_0%,_transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      <Navbar currentPath="/about" />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing education with AI-powered grading solutions
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                We're passionate educators and technologists on a mission to transform the way assignments are graded. Our AI-powered platform helps teachers save countless hours on grading, allowing them to focus on what matters most - teaching and inspiring students.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                With years of experience in education and artificial intelligence, we've developed a solution that understands the nuances of academic assessment across various subjects and grade levels.
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full">
                Learn More
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-teal-100 to-blue-50 flex items-center justify-center">
                <img
                  src="/images/about-illustration.png"
                  alt="About Us Illustration"
                  className="w-3/4 h-3/4 object-contain animate-pulse-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}