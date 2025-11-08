"use client";

import Image from "next/image";
import { NavbarLayout } from "@/layouts/navbar";
import { LandingTextLayout } from "@/layouts/landing";
import logo from "@/assets/logo-3d.png";
import sejarah from "@/assets/sejarah.png";
import styles from "@/styles/landing.module.css";
import { motion } from "framer-motion";
import { SejarahLayout } from "@/layouts/sejarah";

export default function Home() {
  return (
    <div>
      <NavbarLayout/>
      <section className={styles.content}>
        <LandingTextLayout/>
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileTap={{ scale: 0.95 }}
        >
            <Image
              src={logo}
              width={425}
              height={425}
              alt="logo tkiti"
            />
        </motion.div>
      </section>
      <section className={styles.sejarah}>
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileTap={{ scale: 0.95 }}
        >
            <Image
              src={sejarah}
              width={450}
              height={450}
              alt="logo tkiti"
            />
        </motion.div>
        <SejarahLayout/>
      </section>
    </div>
  );
}
