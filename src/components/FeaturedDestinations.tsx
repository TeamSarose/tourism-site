"use client";
import { useRef, useEffect, useState } from "react";

const destinations = [
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", // The Pearl-Qatar
    title: "The Pearl-Qatar",
    desc: "A luxurious man-made island featuring Mediterranean-style marinas, upscale shopping, dining, and beautiful waterfront promenades. A must-visit for its vibrant atmosphere and stunning architecture.",
  },
  {
    img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&q=80", // Souq Waqif
    title: "Souq Waqif",
    desc: "A bustling traditional market in the heart of Doha, famous for its winding alleys, spices, handicrafts, and authentic Qatari cuisine. Experience the rich culture and lively ambiance.",
  },
  {
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80", // Museum of Islamic Art
    title: "Museum of Islamic Art",
    desc: "An architectural masterpiece on Doha's Corniche, housing one of the world's most complete collections of Islamic artifacts. The museum offers breathtaking views of the city skyline.",
  },
];

function useCardsInView(count: number) {
  const refs = Array.from({ length: count }, () => useRef<HTMLDivElement>(null));
  const [inView, setInView] = useState(Array(count).fill(false));

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
  return refs.map((ref, i) => [ref, inView[i]] as const);
}

const FeaturedDestinations = () => {
  const cards = useCardsInView(destinations.length);
  return (
    <section id="destinations" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Destinations</h2>
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {destinations.map((d, i) => {
            const [ref, visible] = cards[i];
            return (
              <div
                key={d.title}
                ref={ref}
                className={`bg-gray-100 rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col
                  ${visible ? "opacity-100 scale-100 translate-y-0 animate-fd-zoom-in" : "opacity-0 scale-95 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <img src={d.img} alt={d.title} className="w-full h-40 sm:h-48 md:h-56 object-cover" />
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{d.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{d.desc}</p>
                </div>
              </div>
            );
          })}
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