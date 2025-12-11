"use client";

import { useState } from "react";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import inter from "@/fonts/inter";

// Masih Place Holder
import img from "@/assets/gallery/placeholder.png"

const images = [
  { src: img, alt: "Server Rack Maintenance" },
  { src: img, alt: "Server Rack Maintenance" },
  { src: img, alt: "Server Rack Maintenance" },
  { src: img, alt: "Server Rack Maintenance" },
  { src: img, alt: "Server Rack Maintenance" }
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={`${inter.variable} w-full py-8 bg-white overflow-hidden mb-16`}>
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Title */}
        <motion.h2 
          className="text-3xl md:text-4xl font-extrabold text-black mb-12 tracking-tighter uppercase text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          GALLERY
        </motion.h2>

        <div className="flex flex-col gap-8">
          
          {/* Main Image */}
          <div className="relative w-full aspect-4/3 bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
                style={{ willChange: "opacity, transform" }}
              >
                <Image
                  src={images[activeIndex].src}
                  alt={images[activeIndex].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
                
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? "w-12 bg-[#11AEAF]"
                    : "w-3 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto p-4 md:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {images.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative shrink-0 w-24 md:w-32 aspect-4/3 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === activeIndex
                    ? "ring-4 ring-[#11AEAF] ring-offset-2 scale-105"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}