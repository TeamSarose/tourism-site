"use client";
import { useEffect, useState } from "react";

const OurLocation = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className={`max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10 transition-all duration-1000
        ${show ? "opacity-100 translate-y-0 animate-location-fade-in" : "opacity-0 translate-y-8"}`}
      >
        {/* Map */}
        <div className="w-full md:w-1/2 h-64 md:h-80 rounded-lg overflow-hidden shadow mb-8 md:mb-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.003964479836!2d51.53104007538244!3d25.28544783031409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c5e6b6b6b6b7%3A0x7b7b7b7b7b7b7b7b!2sDoha%2C%20Qatar!5e0!3m2!1sen!2sqa!4v1680000000000!5m2!1sen!2sqa"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Doha, Qatar Map"
          ></iframe>
        </div>
        {/* Details */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Find Us in Qatar</h2>
          <p className="text-lg text-gray-600 mb-4">
            Qatar is a vibrant destination where tradition meets modernity. Explore stunning skylines, rich culture, and warm hospitality in the heart of the Middle East.
          </p>
          <div className="mb-4">
            <div className="flex items-center mb-1">
              <span className="font-semibold text-gray-800 mr-2">City:</span>
              <span>Doha, Qatar</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="font-semibold text-gray-800 mr-2">Address:</span>
              <span>Al Corniche Street, West Bay, Doha</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="font-semibold text-gray-800 mr-2">Phone:</span>
              <span>+974 1234 5678</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-800 mr-2">Email:</span>
              <span>info@tourismqatar.com</span>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes location-fade-in {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-location-fade-in {
          animation: location-fade-in 1s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>
    </section>
  );
};

export default OurLocation; 