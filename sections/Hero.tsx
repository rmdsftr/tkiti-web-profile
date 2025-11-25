"use client";

import dynamic from "next/dynamic";

import { motion, Variants } from "framer-motion";

import inter from "@/fonts/inter";
import Button from "@/components/Button";

const Logo3D = dynamic(() => import("@/components/Logo3D"), { 
    ssr: false 
});

const blurIn: Variants = {
    hidden: { opacity: 0, filter: "blur(20px)", y: 20 },
    visible: (customDelay: number = 0) => ({
        opacity: 1, filter: "blur(0px)", y: 0,
        transition: { delay: customDelay, duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

export default function Hero() {
    const scroll = () => {
        const element = document.getElementById('sejarah');
        if (element) {
            const isMobile = window.innerWidth < 768;
            element.scrollIntoView({ behavior: 'smooth', block: isMobile ? 'start' : 'center', inline: 'nearest' });
        }
    };

    return (
        <section
            id="hero"
            className={`${inter.variable} relative w-full md:min-h-screen flex items-center px-8 md:px-24 lg:px-32 py-8 pt-32 md:pt-24 overflow-hidden`}
        >
            {/* Layer 1 (z-0): Logo 3D*/}
            <div className="absolute inset-0 z-0 hidden lg:flex items-center justify-end pointer-events-none translate-x-[15%]">
                <motion.div
                    className="w-full h-full" 
                    initial={{ opacity: 0, x:50 }}
                    animate={{ opacity: 1, x:0 }}
                    transition={{ duration: 1.25, ease: "easeInOut" }}
                    style={{ willChange: "transform, opacity" }}
                >
                    <Logo3D />
                </motion.div>
            </div>

            {/* Layer 2 (z-10): Masking belakang text*/}
            <div 
                className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
                style={{
                    background: "linear-gradient(90deg, #FFFFFF 40%, rgba(255,255,255,0) 75%)"
                }}
            />

            {/* Layer 3 (z-20): Text*/}
            <div className="relative z-20 w-full lg:w-7/12 max-w-4xl space-y-8 md:space-y-10 text-center lg:text-left">
                <motion.h1 
                    className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold tracking-tighter leading-tight text-black" 
                    variants={blurIn} 
                    initial="hidden" 
                    animate="visible" 
                    custom={0}
                >
                    LABORATORIUM <span className="text-[#11AEAF]">TATA KELOLA DAN INFRASTRUKTUR</span> TEKNOLOGI INFORMASI
                </motion.h1>

                <motion.p 
                    className="text-base sm:text-sm lg:text-md xl:text-lg leading-relaxed text-justify text-gray-700 max-w-3xl mx-auto md:mx-0" 
                    variants={blurIn} 
                    initial="hidden" 
                    animate="visible" 
                    custom={0.2}
                >
                    Kelompok Keilmuan yang mempelajari secara mendalam berbagai aspek infrastruktur teknologi informasi, mulai dari perancangan dan pengelolaan jaringan, konfigurasi dan optimasi server, hingga proses deployment aplikasi dan layanan web. Selain itu, Kelompok Keilmuan ini juga mengkaji strategi pengelolaan teknologi informasi secara menyeluruh.
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

        </section>
    );
}