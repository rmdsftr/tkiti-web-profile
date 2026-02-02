"use client";

import { useState } from "react";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import inter from "@/fonts/inter";

import img from "@/assets/gallery/placeholder.png";

const images = [
    { src: img, alt: "Server Rack Maintenance", title: "Server Rack Maintenance 1", description: "Detailed maintenance of server racks to ensure optimal performance." },
    { src: img, alt: "Server Rack Maintenance", title: "Server Rack Maintenance 2", description: "Detailed maintenance of server racks to ensure optimal performance." },
    { src: img, alt: "Server Rack Maintenance", title: "Server Rack Maintenance 3", description: "Detailed maintenance of server racks to ensure optimal performance." },
    { src: img, alt: "Server Rack Maintenance", title: "Server Rack Maintenance 4", description: "Detailed maintenance of server racks to ensure optimal performance." },
    { src: img, alt: "Server Rack Maintenance", title: "Server Rack Maintenance 5", description: "Detailed maintenance of server racks to ensure optimal performance." },
];

export default function Gallery() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section
            className={`${inter.variable} w-full py-8 bg-white overflow-hidden mb-16`}
        >
            <div className="container mx-auto px-6 lg:px-12">
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
                    <div className="flex justify-center items-center w-full">
                        <div
                            className="relative w-full md:w-3/5 aspect-video bg-gray-100 rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                            onClick={openModal}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeInOut",
                                    }}
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
                    </div>

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
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/50 z-40"
                            onClick={closeModal}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:w-full md:max-w-2xl md:-translate-x-1/2 md:-translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-400"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="px-6 md:px-8 lg:px-10 pt-8 md:pt-10 lg:pt-12 pb-4 md:pb-6">
                                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                                    <Image
                                        src={images[activeIndex].src}
                                        alt={images[activeIndex].alt}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <motion.button
                                onClick={closeModal}
                                className="absolute top-8 md:top-10 lg:top-12 right-6 md:right-8 lg:right-10 p-2 rounded-full border border-white/40 bg-white/70 backdrop-blur-md hover:bg-white/90 transition-all duration-200 z-10 shadow-lg"
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Close modal"
                            >
                                <X size={20} className="text-gray-700" />
                            </motion.button>

                            <div className="px-6 md:px-8 lg:px-10 pb-8 md:pb-10 lg:pb-12 relative">
                                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
                                    {images[activeIndex].title}
                                </h2>

                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {images[activeIndex].description}
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
