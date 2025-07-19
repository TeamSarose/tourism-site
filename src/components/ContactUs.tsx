"use client";
import { useState } from "react";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", package: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
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
      // Send form data to API
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error((await res.json()).error || "Failed to send");
          setSubmitted(true);
          setForm({ name: "", email: "", subject: "", message: "", package: "" });
          setTimeout(() => setSubmitted(false), 4000);
        })
        .catch((err) => {
          setErrors({ form: err.message || "Failed to send message" });
        });
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-[60vh] flex items-center">
      <div className="w-full max-w-xl mx-auto px-2 sm:px-4">
        <div className="bg-white/90 backdrop-blur-lg border border-orange-100 rounded-xl shadow-md p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-orange-700 tracking-tight mb-6 text-center">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name*"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 text-base bg-white/70 placeholder-gray-400 ${errors.name ? "border-red-500" : "border-orange-200"}`}
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address*"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 text-base bg-white/70 placeholder-gray-400 ${errors.email ? "border-red-500" : "border-orange-200"}`}
                value={form.email}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject (optional)"
                className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 text-base bg-white/70 placeholder-gray-400"
                value={form.subject}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div>
              <select
                name="package"
                value={form.package}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 text-base bg-white/70 text-gray-700 mb-2"
              >
                <option value="">Select Your Package</option>
                <option value="Bronze">Bronze</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
              </select>
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Message*"
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 text-base bg-white/70 placeholder-gray-400 ${errors.message ? "border-red-500" : "border-orange-200"}`}
                value={form.message}
                onChange={handleChange}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            {errors.form && (
              <p className="text-red-500 text-xs mt-2 text-center">{errors.form}</p>
            )}
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[var(--gold)] to-[var(--golden-orange)] text-white rounded-xl hover:from-[var(--gold-dark)] hover:to-[var(--golden-orange-light)] font-bold text-lg shadow-lg transition-all duration-200 focus:ring-2 focus:ring-[var(--gold)] focus:outline-none"
            >
              Send Message
            </button>
          </form>
          {submitted && (
            <div className="mt-6 p-4 bg-green-100/80 text-green-700 rounded-xl text-center animate-fade-in text-base">
              Thank you! Your message has been sent.
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
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