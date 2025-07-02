"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? "bg-white shadow-md backdrop-blur border-b border-gray-200" : "bg-white/30 backdrop-blur-md"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Travel Logo"
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
            style={{ minWidth: 40 }}
          />
        </Link>
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium text-lg">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className={`relative transition-colors duration-300 underline-offset-8 decoration-2 text-black hover:text-orange-500 focus:text-orange-500
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
          <span className="block w-6 h-0.5 bg-orange-600 mb-1.5 rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}"></span>
          <span className="block w-6 h-0.5 bg-orange-600 mb-1.5 rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}"></span>
          <span className="block w-6 h-0.5 bg-orange-600 rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
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
                className={`block py-2 px-2 rounded transition-colors duration-300 underline-offset-8 decoration-2 text-black hover:text-orange-500 focus:text-orange-500
                  hover:underline focus:underline hover:bg-orange-50`}
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