"use client";
import { useRef, useEffect, useState } from "react";

// --- Packages Data ---
const packages = [
  {
    title: "Bronze Package",
    desc: "Perfect for budget travelers",
    features: [
      { icon: "🏙️", text: "Basic city tour" },
      { icon: "👥", text: "Group travel" },
      { icon: "🍽️", text: "One meal included" }
    ]
  },
  {
    title: "Silver Package",
    desc: "Great for explorers seeking more adventure",
    features: [
      { icon: "🏙️", text: "City + desert tour" },
      { icon: "🧑‍🤝‍🧑", text: "Semi-private travel" },
      { icon: "🍽️", text: "Two meals included" },
      { icon: "🧑‍🤝‍🧑", text: "Guide" }
    ]
  },
  {
    title: "Gold Package",
    desc: "Ideal for full cultural immersion",
    features: [
      { icon: "🏙️", text: "Full premium tour: city, desert & culture spots" },
      { icon: "🧑‍🤝‍🧑", text: "Private travel" },
      { icon: "🍽️", text: "All meals & personal guide" },
      { icon: "🎁", text: "Welcome kit" }
    ]
  }
];

// --- Features Data ---
const features = [
  {
    icon: (
      <svg className="w-10 h-10 text-orange-500 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 2.5 3 5 3 5s3-2.5 3-5c0-1.657-1.343-3-3-3z" /><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /></svg>
    ),
    title: "Affordable Packages",
    desc: "Best value deals for every budget."
  },
  {
    icon: (
      <svg className="w-10 h-10 text-orange-500 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V7a4 4 0 00-8 0v3m12 0a4 4 0 01-8 0" /></svg>
    ),
    title: "Trusted Guides",
    desc: "Expert local guides for every trip."
  },
  {
    icon: (
      <svg className="w-10 h-10 text-orange-500 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636A9 9 0 115.636 18.364 9 9 0 0118.364 5.636z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" /></svg>
    ),
    title: "24/7 Support",
    desc: "We're here for you anytime, anywhere."
  }
];

const ExperienceSection = () => {
  // Animation for Packages
  const pkgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pkgInView, setPkgInView] = useState(Array(packages.length).fill(false));
  // Animation for Features
  const featuresRef = useRef<HTMLDivElement>(null);
  const [featuresInView, setFeaturesInView] = useState(false);

  useEffect(() => {
    // Packages animation
    const pkgObservers: IntersectionObserver[] = [];
    pkgRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setPkgInView(prev => {
              const updated = [...prev];
              updated[i] = true;
              return updated;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
      pkgObservers.push(observer);
    });
    // Features animation
    let featuresObserver: IntersectionObserver | null = null;
    if (featuresRef.current) {
      featuresObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setFeaturesInView(true);
            if (featuresObserver) {
              featuresObserver.disconnect();
            }
          }
        },
        { threshold: 0.2 }
      );
      featuresObserver.observe(featuresRef.current);
    }
    return () => {
      pkgObservers.forEach(obs => {
        obs.disconnect();
      });
      if (featuresObserver) {
        featuresObserver.disconnect();
      }
    };
  }, []);

  return (
    <section id="experience" className="relative py-16 bg-gradient-to-br from-orange-50 via-blue-50 to-purple-100 overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{background: 'radial-gradient(circle at 70% 30%, #fbbf24 0%, transparent 70%)'}}></div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* --- Packages Block --- */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4 text-black drop-shadow-lg">Our Tour Packages</h2>
        <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">Choose from our best-selling experiences and start your adventure in Qatar today!</p>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 mb-16">
          {packages.map((pkg, i) => (
            <div
              key={pkg.title}
              ref={el => {
                pkgRefs.current[i] = el;
              }}
              className={`bg-[#f9f6f2] rounded-3xl shadow-xl border border-orange-100 p-7 flex flex-col items-center transition-transform duration-500 cursor-pointer
                ${pkgInView[i] ? "opacity-100 translate-y-0 scale-100 animate-pkg-fade-up" : "opacity-0 translate-y-8 scale-95"}
                hover:scale-105 hover:shadow-2xl`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <h3 className="text-xl font-bold mb-1 text-orange-700 text-center">{pkg.title}</h3>
              <p className="text-sm text-gray-500 mb-4 text-center">{pkg.desc}</p>
              <ul className="mb-6 space-y-3 w-full">
                {pkg.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700 text-base">
                    <span className="text-lg">{f.icon}</span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.hash = "#contact";
                  }
                }}
                className="mt-auto mx-auto block px-6 py-2 bg-[var(--golden-orange)] hover:bg-[var(--gold)] text-white font-bold rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] text-center"
                type="button"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
        {/* --- Features Block --- */}
        <div
          ref={featuresRef}
          className={`relative z-10 bg-white/90 backdrop-blur-md py-8 md:py-12 shadow-lg rounded-2xl transition-all duration-700
            ${featuresInView ? "opacity-100 translate-y-0 animate-feat-fade-up" : "opacity-0 translate-y-8"}`}
        >
          <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center flex-1">
                {f.icon}
                <h3 className="text-xl font-bold mb-1 text-gray-900">{f.title}</h3>
                <p className="text-gray-600 text-base">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes pkg-fade-up {
          0% { opacity: 0; transform: translateY(32px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-pkg-fade-up {
          animation: pkg-fade-up 0.9s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .hover\:scale-105:hover {
          transform: scale(1.05);
          transition: transform 350ms cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes feat-fade-up {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-feat-fade-up {
          animation: feat-fade-up 1s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection; 