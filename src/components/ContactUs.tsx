"use client";
import { useState, useRef, useEffect } from "react";

const contactInfo = [
  {
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.789 1.106l.723 1.447a2 2 0 001.789 1.106h2.418a2 2 0 001.789-1.106l.723-1.447A2 2 0 0116.72 3H19a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" /></svg>
    ),
    label: "Phone",
    value: "+974 1234 5678",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm-8 0V8a4 4 0 018 0v4" /></svg>
    ),
    label: "Email",
    value: "info@tourismqatar.com",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12 12 0 003.48 20.52l-1.3 4.77a1 1 0 001.22 1.22l4.77-1.3A12 12 0 0020.52 3.48zm-8.52 17a10 10 0 1110-10 10 10 0 01-10 10zm5.2-7.6l-2.2-.6a1 1 0 00-1.1.3l-.7.7a8.1 8.1 0 01-3.6-3.6l.7-.7a1 1 0 00.3-1.1l-.6-2.2a1 1 0 00-1.1-.7A6.9 6.9 0 006 12a7 7 0 007 7 6.9 6.9 0 003.1-.7 1 1 0 00-.7-1.1z" /></svg>
    ),
    label: "WhatsApp",
    value: "+974 1234 5678",
  },
];

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);
  const [infoInView, setInfoInView] = useState(false);

  useEffect(() => {
    if (!infoRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInfoInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(infoRef.current);
    return () => observer.disconnect();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: { [k: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Full Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(form.email)) newErrors.email = "Invalid email address";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }
  }

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-2 sm:px-4 flex flex-col md:flex-row gap-6 md:gap-12 items-stretch">
        {/* Left: Contact Form */}
        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-4 sm:p-8 flex flex-col justify-center mb-6 md:mb-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name*"
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 text-sm sm:text-base ${errors.name ? "border-red-500" : "border-gray-300"}`}
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address*"
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 text-sm sm:text-base ${errors.email ? "border-red-500" : "border-gray-300"}`}
                value={form.email}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject (optional)"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 text-sm sm:text-base"
                value={form.subject}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Message*"
                rows={4}
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 text-sm sm:text-base ${errors.message ? "border-red-500" : "border-gray-300"}`}
                value={form.message}
                onChange={handleChange}
              />
              {errors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 sm:px-8 sm:py-3 bg-orange-500 text-white rounded hover:bg-orange-600 font-semibold transition-all duration-200 shadow focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm sm:text-base"
            >
              Send Message
            </button>
          </form>
          {submitted && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-100 text-green-700 rounded text-center animate-fade-in text-sm sm:text-base">
              Thank you! Your message has been sent.
            </div>
          )}
        </div>
        {/* Right: Contact Info */}
        <div
          ref={infoRef}
          className={`w-full md:w-1/2 flex flex-col justify-center bg-orange-50 rounded-xl shadow-lg p-4 sm:p-8 transition-all duration-1000
            ${infoInView ? "opacity-100 translate-y-0 animate-info-fade-up" : "opacity-0 translate-y-8"}`}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-orange-700">Contact Information</h3>
          <ul className="space-y-6 sm:space-y-8">
            {contactInfo.map((info) => (
              <li key={info.label} className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  {info.icon}
                </div>
                <span className="text-base sm:text-lg font-semibold text-gray-800 mb-0.5 sm:mb-1">{info.label}</span>
                <span className="text-sm sm:text-base text-gray-600">{info.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx global>{`
        @keyframes info-fade-up {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-info-fade-up {
          animation: info-fade-up 1s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in forwards;
        }
      `}</style>
    </section>
  );
};

export default ContactUs; 