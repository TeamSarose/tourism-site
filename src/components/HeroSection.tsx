"use client";

import Navbar from "@/components/Navbar";
import FeaturesSection from "@/components/FeaturesSection";
import { useEffect, useState } from "react";

const bgImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=80"; // Beautiful beach sunset

const HeroSection = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-end">
      {/* Background image and overlay */}
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage}')` }}
      ></div>
      {/* Warm, semi-transparent overlay for sunset image */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-orange-900/60 to-orange-700/40"></div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-white text-center px-4 pt-28 sm:pt-32 md:pt-40 pb-10 sm:pb-16">
        <h1
          className={`text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 tracking-tight drop-shadow-2xl transition-all duration-1000
            ${show ? "opacity-100 scale-100 animate-hero-fade-in" : "opacity-0 scale-95"}`}
        >
          Discover Breathtaking Destinations
        </h1>
        <p
          className={`mt-2 text-base xs:text-lg sm:text-xl md:text-2xl mb-6 sm:mb-10 max-w-md sm:max-w-2xl drop-shadow-lg font-medium transition-all duration-1000
            ${show ? "opacity-100 translate-y-0 animate-fade-in-up delay-200" : "opacity-0 translate-y-8"}`}
        >
          Find your next adventure with our curated travel experiences, from sun-kissed beaches to majestic mountains and vibrant cities.
        </p>
        <a
          href="#contact"
          className={`inline-block mt-2 px-6 py-3 sm:px-10 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white text-base sm:text-lg md:text-xl font-bold rounded-full shadow-lg transition-all duration-300
            ${show ? "opacity-100 scale-100 animate-hero-fade-in delay-200" : "opacity-0 scale-95"}`}
        >
          Book Now
        </a>
      </div>

      {/* Features Section */}
      <div className="px-2 sm:px-0">
        <FeaturesSection />
      </div>

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