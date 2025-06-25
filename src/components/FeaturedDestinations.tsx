"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const destinations = [
  {
    img: "/images/pearl-qatar.jpg", // The Pearl-Qatar
    title: "The Pearl-Qatar",
    desc: "A luxurious man-made island featuring Mediterranean-style marinas, upscale shopping, dining, and beautiful waterfront promenades. A must-visit for its vibrant atmosphere and stunning architecture.",
  },
  {
    img: "/images/souq-waqif.jpg", // Souq Waqif
    title: "Souq Waqif",
    desc: "A bustling traditional market in the heart of Doha, famous for its winding alleys, spices, handicrafts, and authentic Qatari cuisine. Experience the rich culture and lively ambiance.",
  },
  {
    img: "/images/museum-islamic-art.jpg", // Museum of Islamic Art
    title: "Museum of Islamic Art",
    desc: "An architectural masterpiece on Doha's Corniche, housing one of the world's most complete collections of Islamic artifacts. The museum offers breathtaking views of the city skyline.",
  },
];

const FeaturedDestinations = () => {
  // Create refs array at the top level
  const refs = Array.from({ length: destinations.length }, () => useRef<HTMLDivElement>(null));
  const [inView, setInView] = useState(Array(destinations.length).fill(false));

  useEffect(() => {
    refs.forEach((ref, i) => {
      if (!ref.current) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView((prev) => {
              const updated = [...prev];
              updated[i] = true;
              return updated;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    });
    // eslint-disable-next-line
  }, []);

  return (
    <section id="destinations" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Destinations</h2>
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {destinations.map((d, i) => (
            <div
              key={d.title}
              ref={refs[i]}
              className={`bg-gray-100 rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col
                ${inView[i] ? "opacity-100 scale-100 translate-y-0 animate-fd-zoom-in" : "opacity-0 scale-95 translate-y-8"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <Image
                src={d.img}
                alt={d.title}
                width={600}
                height={224}
                className="w-full h-40 sm:h-48 md:h-56 object-cover"
                style={{ objectFit: 'cover' }}
              />
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{d.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fd-zoom-in {
          0% { opacity: 0; transform: scale(0.95) translateY(32px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fd-zoom-in {
          animation: fd-zoom-in 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>
    </section>
  );
};

export default FeaturedDestinations; 