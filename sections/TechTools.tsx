"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import linuxLogo from "@/assets/techs/linux.png";
import ubuntuLogo from "@/assets/techs/ubuntu.png";
import debianLogo from "@/assets/techs/debian.png";
import proxmoxLogo from "@/assets/techs/proxmox.png";
import cloudflareLogo from "@/assets/techs/cloudflare.png";
import aapanelLogo from "@/assets/techs/aapanel.png";
import oracleLogo from "@/assets/techs/oracle.png";
import wiresharkLogo from "@/assets/techs/wireshark.png";

const tools = [
  { name: "Linux", logo: linuxLogo },
  { name: "Ubuntu", logo: ubuntuLogo },
  { name: "Debian", logo: debianLogo },
  { name: "Proxmox", logo: proxmoxLogo },
  { name: "Cloudflare", logo: cloudflareLogo },
  { name: "AaPanel", logo: aapanelLogo },
  { name: "Oracle", logo: oracleLogo },
  { name: "Wireshark", logo: wiresharkLogo },
];

const marqueeTools = [...tools, ...tools, ...tools];

export default function TechTools() {
  return (
    <section className="w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-black mb-16 md:mb-24 tracking-tighter uppercase text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          TECH & TOOLS
        </motion.h2>

        {/* Marquee */}
        <div 
          className="relative w-full overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <motion.div
            className="flex gap-12 md:gap-24 items-center w-max py-6"
            animate={{ x: "-33.33%" }} 
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            style={{ willChange: "transform" }}
            whileHover={{ animationPlayState: "paused" }} 
          >
            {marqueeTools.map((tool, index) => (
              <div
                key={`${tool.name}-${index}`}
                className="shrink-0 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center 
                           group cursor-pointer relative"
              >
                <Image
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  width={112}
                  height={112}
                  className="max-w-full max-h-full object-contain 
                             /* EFEK VISUAL MODERN: */
                             filter grayscale opacity-60 
                             transition-all duration-300 
                             /* Saat Hover: Jadi berwarna & jelas & sedikit membesar */
                             group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                  priority={index < tools.length}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}