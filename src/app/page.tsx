"use client";

import CanvasSequence from "@/components/CanvasSequence";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="relative min-h-[600vh]">
      {/* Background Canvas Animation */}
      <CanvasSequence />

      {/* ─── Chapter 1: Hero ─────────────────────────────────────── */}
      <section className="min-h-screen flex items-end md:items-center pt-20 pb-16 md:pt-24 md:pb-12">
        <div className="w-full px-6 md:container md:mx-auto md:px-12 md:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="bg-white/30 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none rounded-2xl p-6 md:p-0"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-luxury-dark leading-tight tracking-wide mb-4 md:mb-6">
              Where Luxury<br />Begins
            </h1>
            <p className="text-base md:text-xl text-luxury-secondary max-w-sm font-light tracking-wide mb-8 md:mb-10 leading-relaxed">
              A fragrance inspired by elegance, crafted to bloom with every moment.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <button className="w-full sm:w-auto px-8 py-4 bg-luxury-dark text-white uppercase tracking-widest text-xs md:text-sm hover:bg-luxury-rose transition-colors duration-500">
                Explore Collection
              </button>
              <button className="group flex items-center space-x-2 text-luxury-dark uppercase tracking-widest text-xs md:text-sm hover:text-luxury-rose transition-colors duration-500">
                <span className="w-8 md:w-10 h-[1px] bg-luxury-dark group-hover:bg-luxury-rose transition-colors duration-500"></span>
                <span>Watch Story</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Chapter 2: The Fragrance Awakens ───────────────────── */}
      <section id="fragrance" className="min-h-screen flex flex-col justify-center py-20 md:py-24">
        <div className="w-full px-6 md:container md:mx-auto md:px-12 md:w-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.5 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-rose mb-4 block">Chapter II</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-luxury-dark mb-4">
              Every Spray<br />Tells a Story
            </h2>
            <p className="text-luxury-secondary font-light tracking-wide max-w-sm mb-10 md:mb-12 text-sm md:text-base">
              A delicate harmony of floral elegance and timeless sophistication.
            </p>

            <div className="grid grid-cols-2 md:flex md:flex-col gap-3 md:gap-4 md:space-y-0">
              {["Rose", "Peony", "Pomegranate", "White Musk"].map((note, index) => (
                <motion.div
                  key={note}
                  className="glass-card px-5 py-4 md:px-8 md:py-6 rounded-xl md:w-64 backdrop-blur-md"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                >
                  <h3 className="font-serif text-xl md:text-2xl text-luxury-dark">{note}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Chapter 3: Inside The Fragrance ────────────────────── */}
      <section id="ingredients" className="py-20 md:py-32">
        <div className="w-full px-6 md:container md:mx-auto md:px-12 md:w-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-12 md:mb-20"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-rose mb-4 block">Chapter III</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-luxury-dark">Inside The Fragrance</h2>
          </motion.div>

          <div className="space-y-16 md:space-y-32">
            {[
              { title: "Rose Essence", desc: "Hand-picked at dawn for maximum purity." },
              { title: "Peony Bloom", desc: "Delicate and airy, bringing a soft freshness." },
              { title: "Warm Amber", desc: "A sensual foundation that lingers elegantly." },
              { title: "Vanilla Orchid", desc: "A creamy, smooth embrace." },
            ].map((ingredient) => (
              <motion.div
                key={ingredient.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="h-[1px] w-10 md:w-12 bg-luxury-rose mb-5 md:mb-6"></div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-luxury-dark mb-3 md:mb-4 tracking-wide">
                  {ingredient.title}
                </h2>
                <p className="text-luxury-secondary font-light tracking-wide text-sm md:text-lg max-w-xs">
                  {ingredient.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Chapter 4 & 5: Luxury Highlights ──────────────────── */}
      <section id="story" className="min-h-screen flex items-center justify-center py-20 md:py-24">
        <div className="w-full px-6 md:container md:mx-auto md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-10 md:mb-14 text-center md:text-left md:max-w-lg"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-rose mb-4 block">Chapter IV</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-luxury-dark">Luxury in Every Detail</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 md:max-w-3xl">
            {[
              { title: "Long Lasting", desc: "12 Hours of Elegant Presence" },
              { title: "Premium Ingredients", desc: "Crafted from the Finest Floral Extracts" },
              { title: "French Inspired", desc: "Luxury Fragrance Experience" },
              { title: "Perfect Gift", desc: "Designed to Leave a Lasting Impression" },
            ].map((highlight, index) => (
              <motion.div
                key={highlight.title}
                className="glass-card p-6 md:p-10 rounded-2xl backdrop-blur-xl border border-white/20 hover:bg-white/10 active:scale-95 transition-all duration-500"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              >
                <h3 className="font-serif text-xl md:text-2xl text-luxury-dark mb-2">{highlight.title}</h3>
                <div className="h-[1px] w-8 bg-luxury-rose my-3"></div>
                <p className="text-luxury-secondary font-light text-xs uppercase tracking-widest">{highlight.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Chapter 6: Finale ──────────────────────────────────── */}
      <section id="contact" className="min-h-screen flex flex-col items-center justify-center text-center px-5 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="glass-card p-8 sm:p-12 md:p-20 rounded-3xl md:rounded-[3rem] max-w-lg md:max-w-4xl w-full border border-white/40 shadow-2xl"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-luxury-rose mb-6 block">The Finale</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-luxury-dark mb-5 md:mb-6 tracking-wide leading-tight">
            Leave a Lasting<br />Impression
          </h2>
          <p className="text-base md:text-xl text-luxury-secondary font-light tracking-wide mb-10 md:mb-12 max-w-sm mx-auto">
            More than a fragrance. A signature of elegance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <button className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-luxury-dark text-white uppercase tracking-widest text-xs md:text-sm hover:bg-luxury-rose transition-all duration-500 hover:shadow-lg hover:shadow-luxury-rose/20">
              Shop Collection
            </button>
            <button className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-transparent border border-luxury-dark text-luxury-dark uppercase tracking-widest text-xs md:text-sm hover:border-luxury-rose hover:text-luxury-rose transition-all duration-500">
              Discover More
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-20 md:mt-28 text-center w-full border-t border-luxury-rose/20 pt-8">
          <p className="font-serif text-xl md:text-2xl tracking-widest text-luxury-dark mb-2">L'ÉLÉGANCE</p>
          <p className="text-xs uppercase tracking-widest text-luxury-secondary">© 2025 · Crafted with Elegance · Paris</p>
        </footer>
      </section>
    </main>
  );
}
