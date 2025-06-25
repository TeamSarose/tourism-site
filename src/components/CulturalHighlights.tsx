"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const highlights = [
  {
    img: "/images/dhow-boats.jpg",
    title: "Traditional Dhow Boats",
    desc: "Dhow boats are a symbol of Qatar's maritime heritage. Once used for pearl diving and fishing, these beautifully crafted wooden vessels now offer scenic cruises along the Doha Corniche, especially enchanting at sunset.",
  },
  {
    img: "/images/falconry.jpg",
    title: "Falconry",
    desc: "Falconry is deeply rooted in Qatari culture and is recognized by UNESCO as Intangible Cultural Heritage. Falcons are highly prized, and you can witness this ancient tradition at the Falcon Souq or during local festivals.",
  },
  {
    img: "/images/qatari-cuisine.jpg",
    title: "Qatari Cuisine",
    desc: "Qatari cuisine, such as Machboos (spiced rice with meat) and Karak tea, reflects the country's rich history and hospitality. Enjoy these flavors at traditional restaurants and local markets throughout Doha.",
  },
];

function useInView(ref: React.RefObject<HTMLDivElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

const CulturalHighlights = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Cultural Highlights</h2>
        <p className="text-center text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover the heart and soul of Qatar through its iconic traditions, cuisine, and living heritage.
        </p>
        <div
          ref={sectionRef}
          className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3"
        >
          {highlights.map((h, i) => (
            <div
              key={h.title}
              className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center text-center p-4 sm:p-6 transition-all duration-700
                ${inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}
                delay-${i * 150}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <Image
                src={h.img}
                alt={h.title}
                width={600}
                height={160}
                className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3 sm:mb-4 shadow-md"
                style={{ objectFit: 'cover' }}
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-blue-700">{h.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CulturalHighlights; 