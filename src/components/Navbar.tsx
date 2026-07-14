"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

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
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-nav py-4" : "bg-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex-1">
          <Link href="/" className="text-2xl font-serif tracking-widest text-luxury-dark">
            L'ÉLÉGANCE
          </Link>
        </div>

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

        <div className="flex-1 flex justify-end">
          <button className="flex items-center space-x-2 text-sm tracking-widest uppercase text-luxury-dark hover:text-luxury-rose transition-colors duration-300 group">
            <span>Shop</span>
            <span className="relative overflow-hidden w-8 h-8 rounded-full border border-luxury-dark group-hover:border-luxury-rose flex items-center justify-center transition-colors duration-300">
              <ShoppingBag className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
