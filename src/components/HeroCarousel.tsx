"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const images = [
  "/images/carousel-1.jpg",
  "/images/carousel-2.jpg",
  "/images/carousel-3.jpg",
  "/images/carousel-4.jpg",
  "/images/carousel-5.jpg",
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance every 4s
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  const goTo = (idx: number) => setCurrent(idx);
  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Images */}
      {images.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src={src}
            alt={`Qatar attraction ${idx + 1}`}
            fill
            priority={idx === 0}
            className="object-cover w-full h-full select-none pointer-events-none"
            sizes="100vw"
          />
        </div>
      ))}
      {/* Overlay content (headline, description, CTA) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 tracking-tight drop-shadow-2xl text-white text-center animate-hero-fade-in">
          Discover Breathtaking Destinations
        </h1>
        <p className="mt-2 text-base xs:text-lg sm:text-xl md:text-2xl mb-6 sm:mb-10 max-w-md sm:max-w-2xl drop-shadow-lg font-medium text-white text-center animate-fade-in-up delay-200">
          Find your next adventure with our curated travel experiences, from sun-kissed beaches to majestic mountains and vibrant cities.
        </p>
        <a
          href="#contact"
          className="inline-block mt-2 px-6 py-3 sm:px-10 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white text-base sm:text-lg md:text-xl font-bold rounded-full shadow-lg transition-all duration-300 mb-8 sm:mb-10 md:mb-16 animate-hero-fade-in delay-200"
        >
          Book Now
        </a>
      </div>
      {/* Controls */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/70 hover:bg-orange-500 text-orange-600 hover:text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-200 focus:outline-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/70 hover:bg-orange-500 text-orange-600 hover:text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-200 focus:outline-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-200 ${current === idx ? 'bg-orange-500 border-orange-500 scale-125' : 'bg-white/70 hover:bg-orange-400'}`}
          />
        ))}
      </div>
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

export default HeroCarousel; 