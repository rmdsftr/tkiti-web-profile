"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import inter from "@/fonts/inter";
import Button from "@/components/Button";
import logo from "@/assets/logo-3d.png";

const blurIn: Variants = {
    hidden: {
        opacity: 0,
        filter: "blur(20px)",
        y: 20,
    },
    visible: (customDelay: number = 0) => ({
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
            delay: customDelay,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    }),
};

export default function Hero() {

  // Fungsi untuk Scroll
    const scroll = () => {
        const element = document.getElementById('sejarah');
        if (element) {
            const isMobile = window.innerWidth < 768;

            element.scrollIntoView({ 
                behavior: 'smooth',
                block: isMobile ? 'start' : 'center', 
                inline: 'nearest'
            });
        }
    };

    return (
        <section
            id="hero"
            className={`${inter.variable} w-full md:min-h-screen flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16 lg:gap-10 px-8 md:px-24 lg:px-32 py-8 pt-32 md:pt-24 overflow-hidden`}
        >
            <div className="w-full md:w-2/3 lg:w-7/12 max-w-4xl space-y-8 md:space-y-10 text-center md:text-left">
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl font-extrabold tracking-tighter leading-tight text-black"
                    variants={blurIn}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                >
                    LABORATORIUM <br className="hidden lg:block" />
                    <span className="text-[#11AEAF]">
                        TATA KELOLA DAN INFRASTRUKTUR
                    </span>{" "}
                    TEKNOLOGI INFORMASI
                </motion.h1>

                <motion.p
                    className="text-base sm:text-lg lg:text-xl leading-relaxed text-justify text-gray-700 max-w-3xl mx-auto md:mx-0"
                    variants={blurIn}
                    initial="hidden"
                    animate="visible"
                    custom={0.2}
                >
                    Kelompok Keilmuan yang mempelajari secara mendalam berbagai
                    aspek infrastruktur teknologi informasi, mulai dari
                    perancangan dan pengelolaan jaringan, konfigurasi dan
                    optimasi server, hingga proses deployment aplikasi dan
                    layanan web. Selain itu, Kelompok Keilmuan ini juga mengkaji
                    strategi pengelolaan teknologi informasi secara menyeluruh.
                </motion.p>

                <motion.div
                    className="pt-4 md:pt-6"
                    variants={blurIn}
                    initial="hidden"
                    animate="visible"
                    custom={0.4}
                >
                        <Button variant="primary" size="large" onClick={scroll}>
                            MULAI EKSPLORASI
                        </Button>
                </motion.div>
            </div>

            <div className="hidden md:flex w-full md:w-1/3 lg:w-5/12 justify-center md:sticky relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                        <Image
                            src={logo}
                            width={1000}
                            height={1000}
                            alt="Logo Laboratorium TKITI"
                            className="w-full max-w-[350px] md:max-w-[500px] object-contain"
                            priority
                        />
                </motion.div>
            </div>
        </section>
    );
}