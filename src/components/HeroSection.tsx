"use client";

import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-end">
      {/* Navbar */}
      <Navbar />
      {/* Hero Carousel with overlay content */}
      <HeroCarousel />
      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes hero-fade-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-hero-fade-in {
          animation: hero-fade-in 1s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(32px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroSection; 