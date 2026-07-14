"use client";

import CanvasSequence from "@/components/CanvasSequence";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={containerRef} className="relative min-h-[600vh]">
      {/* Background Canvas Animation */}
      <CanvasSequence />

      {/* Chapter 1: Hero */}
      <section className="min-h-screen flex items-center pt-24 pb-12">
        <div className="container mx-auto px-6 md:px-12 md:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-luxury-dark leading-tight tracking-wide mb-6">
              Where Luxury <br /> Begins
            </h1>
            <p className="text-lg md:text-xl text-luxury-secondary max-w-md font-light tracking-wide mb-10 leading-relaxed">
              A fragrance inspired by elegance, crafted to bloom with every moment.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <button className="px-8 py-4 bg-luxury-dark text-white uppercase tracking-widest text-sm hover:bg-luxury-rose transition-colors duration-500">
                Explore Collection
              </button>
              <button className="group flex items-center space-x-2 text-luxury-dark uppercase tracking-widest text-sm hover:text-luxury-rose transition-colors duration-500">
                <span className="w-10 h-[1px] bg-luxury-dark group-hover:bg-luxury-rose transition-colors duration-500"></span>
                <span>Watch Story</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 2: The Fragrance Awakens */}
      <section id="fragrance" className="min-h-screen flex flex-col justify-center py-24">
        <div className="container mx-auto px-6 md:px-12 md:w-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif text-luxury-dark mb-4">
              Every Spray<br />Tells a Story
            </h2>
            <p className="text-luxury-secondary font-light tracking-wide max-w-sm mb-12">
              A delicate harmony of floral elegance and timeless sophistication.
            </p>

            <div className="flex flex-col space-y-4">
              {["Rose", "Peony", "Pomegranate", "White Musk"].map((note, index) => (
                <motion.div
                  key={note}
                  className="glass-card px-8 py-6 rounded-xl w-64 backdrop-blur-md"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                >
                  <h3 className="font-serif text-2xl text-luxury-dark">{note}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 3: Inside The Fragrance */}
      <section id="ingredients" className="min-h-screen py-32 flex flex-col justify-center">
        <div className="container mx-auto px-6 md:px-12 md:w-1/2">
          <div className="space-y-32">
            {[
              { title: "Rose Essence", desc: "Hand-picked at dawn for maximum purity." },
              { title: "Peony Bloom", desc: "Delicate and airy, bringing a soft freshness." },
              { title: "Warm Amber", desc: "A sensual foundation that lingers elegantly." },
              { title: "Vanilla Orchid", desc: "A creamy, smooth embrace." },
            ].map((ingredient, index) => (
              <motion.div
                key={ingredient.title}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="h-[1px] w-12 bg-luxury-rose mb-6"></div>
                <h2 className="text-4xl md:text-5xl font-serif text-luxury-dark mb-4 tracking-wide">
                  {ingredient.title}
                </h2>
                <p className="text-luxury-secondary font-light tracking-wide text-lg">
                  {ingredient.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 4 & 5: Luxury Highlights */}
      <section id="story" className="min-h-screen flex items-center justify-center relative py-24">
         {/* Subtle background glow or floating elements could go here */}
         <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:w-3/4 mr-auto ml-0 md:ml-12">
            {[
              { title: "Long Lasting", desc: "12 Hours of Elegant Presence" },
              { title: "Premium Ingredients", desc: "Crafted from the Finest Floral Extracts" },
              { title: "French Inspired", desc: "Luxury Fragrance Experience" },
              { title: "Perfect Gift", desc: "Designed to Leave a Lasting Impression" },
            ].map((highlight, index) => (
              <motion.div
                key={highlight.title}
                className="glass-card p-10 rounded-2xl backdrop-blur-xl border border-white/20 hover:bg-white/10 transition-colors duration-500"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              >
                <h3 className="font-serif text-2xl text-luxury-dark mb-2">{highlight.title}</h3>
                <p className="text-luxury-secondary font-light text-sm uppercase tracking-widest">{highlight.desc}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Chapter 6: Finale */}
      <section id="contact" className="min-h-screen flex flex-col items-center justify-center text-center py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="glass-card p-16 md:p-24 rounded-[3rem] max-w-4xl w-full mx-4 border-white/40 shadow-2xl"
        >
          <h2 className="text-5xl md:text-7xl font-serif text-luxury-dark mb-6 tracking-wide">
            Leave a Lasting <br /> Impression
          </h2>
          <p className="text-xl text-luxury-secondary font-light tracking-wide mb-12">
            More than a fragrance. A signature of elegance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <button className="px-10 py-5 bg-luxury-dark text-white uppercase tracking-widest text-sm hover:bg-luxury-rose transition-all duration-500 hover:shadow-lg hover:shadow-luxury-rose/20">
              Shop Collection
            </button>
            <button className="px-10 py-5 bg-transparent border border-luxury-dark text-luxury-dark uppercase tracking-widest text-sm hover:border-luxury-rose hover:text-luxury-rose transition-all duration-500">
              Discover More
            </button>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
