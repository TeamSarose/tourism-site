"use client";
import { useRef, useEffect, useState, RefObject } from "react";

function useInView(ref: RefObject<HTMLElement | null>) {
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
  const inView = useInView(footerRef as RefObject<HTMLElement | null>);
  return (
    <footer
      ref={footerRef}
      className={`bg-gray-900 text-gray-300 py-12 mt-auto transition-all duration-1000
        ${inView ? "opacity-100 translate-y-0 animate-footer-fade-up" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:grid md:grid-cols-3 gap-8 space-y-6 md:space-y-0">
        {/* About Us */}
        <div className="text-center md:text-left text-sm">
          <h2 className="text-xl font-bold text-orange-400 mb-3">About Us</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Tourism Qatar is dedicated to showcasing the beauty, culture, and adventure of Qatar. Discover breathtaking destinations, rich heritage, and unforgettable experiences with us.
          </p>
        </div>
        {/* Quick Links */}
        <div className="text-center md:text-left text-sm">
          <h2 className="text-xl font-bold text-orange-400 mb-3">Quick Links</h2>
          <ul className="space-y-2 flex flex-col items-center md:items-start">
            <li><a href="#" className="hover:text-orange-400 transition-colors">Home</a></li>
            <li><a href="#destinations" className="hover:text-orange-400 transition-colors">Destinations</a></li>
            <li><a href="#culture" className="hover:text-orange-400 transition-colors">Culture</a></li>
            <li><a href="#location" className="hover:text-orange-400 transition-colors">Location</a></li>
            <li><a href="#contact" className="hover:text-orange-400 transition-colors">Contact</a></li>
          </ul>
        </div>
        {/* Contact & Social */}
        <div className="text-center md:text-left text-sm">
          <h2 className="text-xl font-bold text-orange-400 mb-3">Contact Info</h2>
          <ul className="text-gray-400 space-y-1 mb-4">
            <li><span className="font-semibold text-gray-300">Email:</span> info@tourismqatar.com</li>
            <li><span className="font-semibold text-gray-300">Phone:</span> +974 1234 5678</li>
            <li><span className="font-semibold text-gray-300">Location:</span> Doha, Qatar</li>
          </ul>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-orange-400 text-gray-300 hover:text-white rounded-full p-2 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-orange-400 text-gray-300 hover:text-white rounded-full p-2 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.402 3.635 1.37 2.668 2.337 2.396 3.51 2.338 4.788 2.279 6.068 2.267 6.477 2.267 12c0 5.523.012 5.932.071 7.212.058 1.278.33 2.451 1.297 3.418.967.967 2.14 1.239 3.418 1.297 1.28.059 1.689.071 7.212.071s5.932-.012 7.212-.071c1.278-.058 2.451-.33 3.418-1.297.967-.967 1.239-2.14 1.297-3.418.059-1.28.071-1.689.071-7.212s-.012-5.932-.071-7.212c-.058-1.278-.33-2.451-1.297-3.418C21.398.402 20.225.13 18.948.072 17.668.013 17.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-orange-400 text-gray-300 hover:text-white rounded-full p-2 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 text-center md:text-left">
        <span>&copy; 2025 Tourism Qatar. All rights reserved.</span>
        <span>Made with <span className="text-orange-400">&#10084;</span> in Qatar</span>
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