import React from 'react';
import { GraduationCap } from "lucide-react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0d9488]/5 via-white to-[#0d9488]/5 overflow-hidden">
      {/* Background Neon Lines */}
      <div className="absolute inset-0 opacity-30">
        {/* Horizontal Lines */}
        {[...Array(6)].map((_, index) => (
          <div
            key={`h-${index}`}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#0d9488] to-transparent"
            style={{
              top: `${index * 20}%`,
              left: '0',
              right: '0',
              animation: `neonSlideX 8s linear infinite`,
              animationDelay: `${index * 0.5}s`,
            }}
          />
        ))}
        {/* Vertical Lines */}
        {[...Array(6)].map((_, index) => (
          <div
            key={`v-${index}`}
            className="absolute w-[1px] bg-gradient-to-b from-transparent via-[#0d9488] to-transparent"
            style={{
              left: `${index * 20}%`,
              top: '0',
              bottom: '0',
              animation: `neonSlideY 8s linear infinite`,
              animationDelay: `${index * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div className="mb-12 flex items-center gap-2">
          <div className="w-80 h-24 relative animate-pulse-slow">
            <Image
              src="/images/EG_Logo.png"
              alt="EG Logo"
              width={320}
              height={96}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Loading Animation */}
        <div className="relative w-32 h-32">
          {/* Spinning Ring */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="absolute top-0 left-1/2 h-full -ml-[2px]"
                style={{
                  transform: `rotate(${index * 30}deg)`,
                }}
              >
                <div 
                  className="w-1 h-4 rounded-full bg-[#0d9488]"
                  style={{
                    animation: `pulse 1.2s ease-in-out infinite`,
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0.2,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Outer Glow */}
          <div className="absolute inset-0 rounded-full bg-[#0d9488]/10 animate-spin-slow blur-md" />

          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-12 h-12 rounded-full bg-[#0d9488]/10 flex items-center justify-center backdrop-blur-sm">
              <GraduationCap className="w-8 h-8 text-[#0d9488] animate-float" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading; 