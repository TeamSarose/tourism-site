"use client";
import { useRef, useEffect, useState } from "react";

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

const ContactSection = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const inView = useInView(formRef);
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <div
          ref={formRef}
          className={`transition-all duration-1000
            ${inView ? "opacity-100 translate-x-0 animate-contact-slide-in" : "opacity-0 translate-x-16"}`}
        >
          <form className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input type="text" placeholder="Your Name" className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              <input type="email" placeholder="Your Email" className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
            </div>
            <textarea placeholder="Your Message" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4} required></textarea>
            <button type="submit" className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition">Send Message</button>
          </form>
          <div className="mt-8 flex justify-center gap-6">
            <a href="mailto:info@tourism.com" className="text-blue-600 hover:underline">Email</a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">WhatsApp</a>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes contact-slide-in {
          0% { opacity: 0; transform: translateX(64px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-contact-slide-in {
          animation: contact-slide-in 1s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>
    </section>
  );
};

export default ContactSection; 