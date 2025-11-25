"use client";

import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";

import Hero from "@/sections/Hero";
import Sejarah from "@/sections/Sejarah";
import Kegiatan from "@/sections/Kegiatan";
import TechTools from "@/sections/TechTools";
import Struktur from "@/sections/Struktur";
import Gallery from "@/sections/Gallery";

import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main>
            <Navbar />

            <Hero />

            <motion.div
                initial={{ opacity: 0, filter: "blur(15px)", y: 50 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Sejarah />
            </motion.div>

            <Kegiatan />

            <motion.div
                initial={{ opacity: 0, filter: "blur(15px)", y: 50 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <TechTools />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, filter: "blur(15px)", y: 50 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Struktur />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, filter: "blur(15px)", y: 50 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Gallery />
            </motion.div>

            <Footer />
        </main>
    );
}
