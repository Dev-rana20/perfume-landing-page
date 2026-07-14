"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Fragrance", href: "#fragrance" },
    { name: "Ingredients", href: "#ingredients" },
    { name: "Story", href: "#story" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || menuOpen ? "glass-nav py-4" : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-5 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-1">
            <Link href="/" className="text-xl md:text-2xl font-serif tracking-widest text-luxury-dark">
              L'ÉLÉGANCE
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-1 justify-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm tracking-widest uppercase text-luxury-secondary hover:text-luxury-rose transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right: Shop + Hamburger */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <button className="flex items-center space-x-2 text-sm tracking-widest uppercase text-luxury-dark hover:text-luxury-rose transition-colors duration-300 group">
              <span className="hidden sm:inline">Shop</span>
              <span className="relative overflow-hidden w-8 h-8 rounded-full border border-luxury-dark group-hover:border-luxury-rose flex items-center justify-center transition-colors duration-300">
                <ShoppingBag className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-1 text-luxury-dark hover:text-luxury-rose transition-colors duration-300"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-[62px] left-0 right-0 z-40 glass-nav border-t border-white/20 shadow-xl"
          >
            <nav className="flex flex-col px-6 py-6 space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base tracking-widest uppercase text-luxury-secondary hover:text-luxury-rose transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
