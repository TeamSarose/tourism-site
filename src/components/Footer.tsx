"use client";
import { useRef, useEffect, useState } from "react";

function useInView(ref: React.RefObject<HTMLElement>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef);
  return (
    <footer
      ref={footerRef}
      className={`bg-gray-900 text-gray-300 py-6 mt-auto transition-all duration-1000
        ${inView ? "opacity-100 translate-y-0 animate-footer-fade-up" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Tourism Co. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
      <style jsx global>{`
        @keyframes footer-fade-up {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-footer-fade-up {
          animation: footer-fade-up 1.5s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer; 