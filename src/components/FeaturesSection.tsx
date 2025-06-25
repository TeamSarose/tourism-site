const features = [
  {
    icon: (
      <svg className="w-10 h-10 text-blue-600 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 2.5 3 5 3 5s3-2.5 3-5c0-1.657-1.343-3-3-3z" /><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /></svg>
    ),
    title: "Affordable Packages",
    desc: "Best value deals for every budget."
  },
  {
    icon: (
      <svg className="w-10 h-10 text-blue-600 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V7a4 4 0 00-8 0v3m12 0a4 4 0 01-8 0" /></svg>
    ),
    title: "Trusted Guides",
    desc: "Expert local guides for every trip."
  },
  {
    icon: (
      <svg className="w-10 h-10 text-blue-600 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636A9 9 0 115.636 18.364 9 9 0 0118.364 5.636z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" /></svg>
    ),
    title: "24/7 Support",
    desc: "We're here for you anytime, anywhere."
  }
];

const FeaturesSection = () => (
  <section className="relative z-10 bg-white/80 backdrop-blur-md py-8 md:py-12 shadow-lg -mt-12 md:-mt-20 rounded-b-2xl">
    <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
      {features.map((f, i) => (
        <div key={i} className="flex flex-col items-center text-center flex-1">
          {f.icon}
          <h3 className="text-xl font-bold mb-1 text-gray-900">{f.title}</h3>
          <p className="text-gray-600 text-base">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection; 