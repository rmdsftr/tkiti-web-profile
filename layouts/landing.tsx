"use client";

import { motion } from "framer-motion";
import styles from "@/styles/landing.module.css";
import inter from "@/fonts/inter";
import Button from "@/components/button";

export function LandingTextLayout(){
    return(
        <motion.div 
            className={`${styles.container} ${inter.variable}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.h1 
                className={styles.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                LABORATORIUM <br />
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    TATA KELOLA dan INFRASTUKTUR
                </motion.span> <br />
                TEKNOLOGI INFORMASI
            </motion.h1>
            <br />
            <motion.p 
                className={styles.p}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            >
                Merupakan Kelompok Keilmuan (KK) yang mempelajari secara mendalam berbagai aspek infrastruktur teknologi informasi, mulai dari perancangan dan pengelolaan jaringan, konfigurasi dan optimasi server, hingga proses deployment aplikasi dan layanan web. Selain itu, Kelompok Keilmuan ini juga mengkaji strategi pengelolaan teknologi informasi secara menyeluruh, mencakup perencanaan, implementasi, dan evaluasi, untuk memastikan bahwa pemanfaatan TI dapat mendukung pencapaian tujuan organisasi secara efektif, efisien, dan berkelanjutan di tengah perkembangan teknologi yang pesat.
            </motion.p>
            <br />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                whileTap={{ scale: 0.95 }}
            >
                <Button variant="primary" size="large">MULAI EKSPLORASI</Button>
            </motion.div>
        </motion.div>
    )
}