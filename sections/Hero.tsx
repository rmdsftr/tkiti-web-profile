"use client";

import dynamic from "next/dynamic";

import { motion, Variants } from "framer-motion";
import { useSyncExternalStore, useCallback } from "react";

import inter from "@/fonts/inter";
import Button from "@/components/Button";

const Logo3D = dynamic(() => import("@/components/Logo3D"), { 
    ssr: false 
});

const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (customDelay: number = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: customDelay, duration: 0.8, ease: "easeInOut" },
    }),
};

function useMediaQuery(query: string) {
    const subscribe = useCallback((callback: () => void) => {
      const matchMedia = window.matchMedia(query);
      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    }, [query]);
  
    const getSnapshot = () => {
      return window.matchMedia(query).matches;
    };
  
    const getServerSnapshot = () => {
      return false;
    };
  
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function Hero() {
    const isDesktop = useMediaQuery("(min-width: 1024px)");

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
            {isDesktop && (
                <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none translate-x-[15%]">
                    <motion.div
                        className="w-full h-full" 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.25, ease: "easeInOut" }}
                        style={{ willChange: "transform, opacity" }}
                    >
                        <Logo3D />
                    </motion.div>
                </div>
            )}

            {isDesktop && (
                <div 
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background: "linear-gradient(90deg, #FFFFFF 40%, rgba(255,255,255,0) 75%)"
                    }}
                />
            )}

            <div className="relative z-20 w-full lg:w-7/12 max-w-4xl space-y-8 md:space-y-10 text-center lg:text-left">
                <motion.h1 
                    className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-extrabold tracking-tighter leading-tight text-black" 
                    variants={fadeIn} 
                    initial="hidden" 
                    animate="visible" 
                    custom={0}
                >
                    LABORATORIUM <span className="text-[#11AEAF]">TATA KELOLA DAN INFRASTRUKTUR</span> TEKNOLOGI INFORMASI
                </motion.h1>

                <motion.p 
                    className="text-base sm:text-sm lg:text-md xl:text-lg leading-relaxed text-justify text-gray-700 max-w-3xl mx-auto md:mx-0" 
                    variants={fadeIn} 
                    initial="hidden" 
                    animate="visible" 
                    custom={0.2}
                >
                    Kelompok Keilmuan yang mempelajari secara mendalam berbagai aspek infrastruktur teknologi informasi, mulai dari perancangan dan pengelolaan jaringan, konfigurasi dan optimasi server, hingga proses deployment aplikasi dan layanan web. Selain itu, Kelompok Keilmuan ini juga mengkaji strategi pengelolaan teknologi informasi secara menyeluruh.
                </motion.p>

                <motion.div 
                    className="pt-4 md:pt-6" 
                    variants={fadeIn} 
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