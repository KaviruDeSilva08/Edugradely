"use client";

import { Button } from "@/components/ui/button";
import { GraduationCap, Upload, Brain, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Loading from './components/loading';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-50 via-white to-blue-50"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-teal-100/30 via-blue-100/30 to-purple-100/30 bg-gradient-size animate-gradient"></div>
      <div className="relative">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-24 md:pt-32 max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 text-center relative min-h-screen flex items-center justify-center">
          {/* Decorative Elements */}
          <img
            src="/images/laptop.png"
            alt=""
            className="hidden md:block absolute left-20 top-20 w-24 md:w-32 opacity-90 animate-shake-1"
          />
          <img
            src="/images/clipboard.png"
            alt=""
            className="hidden md:block absolute right-32 top-40 w-20 md:w-24 opacity-90 animate-shake-2"
          />
          <img
            src="/images/document.png"
            alt=""
            className="hidden md:block absolute left-40 bottom-20 w-24 md:w-28 opacity-90 animate-shake-3"
          />
          <img
            src="/images/backpack.png"
            alt=""
            className="hidden md:block absolute right-40 bottom-40 w-24 md:w-32 opacity-90 animate-shake-1"
          />
          <img
            src="/images/books.png"
            alt=""
            className="hidden md:block absolute right-20 bottom-20 w-24 md:w-32 opacity-90 animate-shake-2"
          />

          {/* Main Content */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="flex justify-center mb-4 md:mb-6">
              <GraduationCap className="h-12 w-12 md:h-16 md:w-16 text-teal-600" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              Unlock Time for
              <br />
              Teaching with AI Grading
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
              Let's reduce the time taken for marking, give time for teaching,
              make any subject easy with new technology.
            </p>
            <Link href="/dashboard">
              <Button 
                className="bg-teal-600 hover:bg-teal-700 text-white text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-full"
                size="lg"
              >
                Start Grading
              </Button>
            </Link>
          </div>
        </section>

        {/* How it Works Preview Section */}
        <section className="py-20 md:py-32 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Transform your grading process in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-600">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-teal-600">Step 01</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Upload your assignments in any format. Our system supports various file types 
                  including PDFs, Word documents, and scanned papers.
                </p>
                <Link href="/how-it-works">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600">Step 02</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Our AI system analyzes the content using advanced algorithms. It evaluates 
                  responses and applies your grading criteria consistently.
                </p>
                <Link href="/how-it-works">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-teal-600">Step 03</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Review the AI-generated grades and feedback. Make adjustments and share 
                  detailed results with your students.
                </p>
                <Link href="/how-it-works">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Preview Section */}
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
                <p className="text-lg text-gray-600 mb-6">
                  We're passionate educators and technologists on a mission to transform the way assignments are graded. Our AI-powered platform helps teachers save countless hours on grading, allowing them to focus on what matters most - teaching and inspiring students.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  With years of experience in education and artificial intelligence, we've developed a solution that understands the nuances of academic assessment across various subjects and grade levels.
                </p>
                <Link href="/about">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full">
                    Learn More
                  </Button>
                </Link>
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

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}