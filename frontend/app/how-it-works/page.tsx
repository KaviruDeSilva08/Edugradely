"use client";

import { Button } from "@/components/ui/button";
import { FileText, PenTool, Award, Book, CheckCircle2, Sparkles, Upload, Brain } from "lucide-react";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function HowItWorks() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      stepRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#e5f9ff_0%,_transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#f0f7ff_0%,_transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      <Navbar currentPath="/how-it-works" />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            How It Works
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your grading process in three simple steps
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Step 01 */}
          <div 
            ref={(el) => (stepRefs.current[0] = el)}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20 md:mb-32 opacity-0 translate-x-[-50px] transition-all duration-1000"
          >
            <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-600">
                  <Upload className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-teal-600">Step 01</h2>
              </div>
              <p className="text-gray-600 text-lg mb-6">
                Upload your assignments in any format. Our system supports various file types 
                including PDFs, Word documents, and scanned papers. The upload process is simple 
                and secure, ensuring your materials are safely stored and ready for grading.
              </p>
              <div className="flex justify-center">
                <img
                  src="/images/Step_1.png"
                  alt="Document upload interface"
                  className="rounded-lg shadow-md w-full max-w-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="/images/uploadillustration.png"
                alt="Upload illustration"
                className="w-full max-w-md animate-bounce-1"
              />
            </div>
          </div>

          {/* Step 02 */}
          <div 
            ref={(el) => (stepRefs.current[1] = el)}
            className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 mb-20 md:mb-32 opacity-0 translate-x-[50px] transition-all duration-1000"
          >
            <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                  <Brain className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-600">Step 02</h2>
              </div>
              <p className="text-gray-600 text-lg mb-6">
                Our AI system analyzes the content using advanced algorithms. It evaluates 
                responses, identifies key concepts, and applies your grading criteria consistently 
                across all submissions.
              </p>
              <div className="flex justify-center">
                <img
                  src="/images/Step_2.png"
                  alt="AI analysis interface"
                  className="rounded-lg shadow-md w-full max-w-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="/images/analysis_illustration.png"
                alt="Analysis illustration"
                className="w-full max-w-md animate-bounce-1"
              />
            </div>
          </div>

          {/* Step 03 */}
          <div 
            ref={(el) => (stepRefs.current[2] = el)}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-16 opacity-0 translate-x-[-50px] transition-all duration-1000"
          >
            <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-teal-600">Step 03</h2>
              </div>
              <p className="text-gray-600 text-lg mb-6">
                Review the AI-generated grades and feedback. Make any necessary adjustments 
                and share detailed results with your students. The system provides comprehensive 
                analytics and insights to help track progress.
              </p>
              <div className="flex justify-center">
                <img
                  src="/images/Step_3.png"
                  alt="Results dashboard"
                  className="rounded-lg shadow-md w-full max-w-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="/images/results_illustration.png"
                alt="Results illustration"
                className="w-full max-w-md animate-rotate-1"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}