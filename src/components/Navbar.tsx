"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "#" },
  { name: "Packages", href: "#experience" },
  { name: "Destinations", href: "#destinations" },
  { name: "Culture", href: "#about" },
  { name: "Location", href: "#location" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ease-in-out
        ${scrolled ? "bg-gray-900" : "bg-[#F4F1EC]"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={handleLogoClick}>
          <Image
            src="/images/logo.png"
            alt="TravelNest Logo"
            width={72}
            height={72}
            className={`max-h-16 sm:max-h-[72px] w-auto object-contain p-1 sm:p-2 bg-black/90 rounded-full shadow-lg drop-shadow-lg border-2 group-hover:border-[var(--golden-orange)] dark:border-gray-900 dark:bg-black transition-colors duration-300 ${scrolled ? 'border-white' : 'border-white'}`}
            style={{ minWidth: 48, boxShadow: '0 2px 8px 0 rgba(255,255,255,0.7), 0 0 0 2px #fff' }}
          />
        </Link>
        {/* Desktop Menu */}
        <ul className={`hidden md:flex gap-8 font-medium text-lg transition-colors duration-300 ${scrolled ? 'text-gray-100' : 'text-gray-900'}`}>
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className={`relative transition-colors duration-300 underline-offset-8 decoration-2 hover:text-[var(--golden-orange)] focus:text-[var(--golden-orange)]
                  hover:underline focus:underline
                  after:content-[''] after:block after:h-0.5 after:bg-current after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left after:mt-1`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none group"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-900 mb-1.5 rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-900 mb-1.5 rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-900 rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full bg-white/95 shadow-lg z-20 transition-transform duration-300
          ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}
        style={{ backdropFilter: "blur(8px)" }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <span className="font-extrabold text-2xl text-orange-600">Tourism</span>
          <button
            className="w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <span className="block w-6 h-0.5 bg-orange-600 mb-1.5 rounded rotate-45 translate-y-2 transition-all duration-300"></span>
            <span className="block w-6 h-0.5 bg-orange-600 mb-1.5 rounded opacity-0 transition-all duration-300"></span>
            <span className="block w-6 h-0.5 bg-orange-600 rounded -rotate-45 -translate-y-2 transition-all duration-300"></span>
          </button>
        </div>
        <ul className="flex flex-col gap-4 px-6 py-6 text-lg font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className={`block py-2 px-2 rounded transition-colors duration-300 underline-offset-8 decoration-2 text-black hover:text-[var(--golden-orange)] focus:text-[var(--golden-orange)]
                  hover:underline focus:underline hover:bg-[var(--gold)]/10`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;