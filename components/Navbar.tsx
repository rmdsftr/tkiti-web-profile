"use client";
import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { Menu, X } from "lucide-react";

import logo from "@/assets/logo.png";
import inter from "@/fonts/inter";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Articles", href: "/articles" },
        { name: "Structure", href: "/structure" },
        { name: "Repository", href: "/repository" },
        { name: "Free Hosting", href: "/free-hosting" },
    ];

    return (
        <nav
            className={`fixed top-4 left-0 right-0 z-50 mx-auto flex w-full max-w-3xl items-center justify-center px-4 ${inter.variable} font-sans`}
        >
            {/* Kapsul Utama */}
            <div className="relative flex w-full items-center justify-between rounded-full border border-white/40 bg-white/70 px-4 py-2.5 backdrop-blur-md transition-all md:w-auto md:justify-center md:gap-2 md:px-3 md:py-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center transition-transform hover:scale-115"
                >
                    <Image
                        src={logo}
                        width={32}
                        height={32}
                        alt="logo tkiti"
                        className="h-8 w-8 object-contain"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                // Hapus padding horizontal statis (px-5) di sini agar dikontrol oleh motion di dalam
                                className={`relative py-2 text-sm font-medium rounded-full group outline-none
                  ${
                      isActive
                          ? "text-teal-900"
                          : "text-gray-500 hover:text-gray-900"
                  }
                `}
                            >
                                {/* Background Active Indicator */}
                                {isActive && (
                                    <motion.span
                                        layoutId="active-pill" // Magic: Animasi slide pindah posisi antar menu
                                        className="absolute inset-0 -z-10 rounded-full bg-[#D2F1EB]"
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                    />
                                )}

                                {/* Background Hover */}
                                {!isActive && (
                                    <span className="absolute inset-0 -z-10 scale-90 rounded-full bg-gray-200/50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                                )}

                                {/* Animasi Text */}
                                <motion.span
                                    className="relative z-10 block"
                                    initial={{
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                    }}
                                    whileHover={{
                                        paddingLeft: 32,
                                        paddingRight: 32,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                >
                                    {item.name}
                                </motion.span>
                            </Link>
                        );
                    })}
                </div>

                {/* Toggle Mobile Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100/50 md:hidden"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-4 right-4 mt-3 flex flex-col gap-2 rounded-2xl border border-white/40 bg-white/80 p-4 backdrop-blur-lg md:hidden shadow-xl"
                >
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all
                    ${
                        isActive
                            ? "bg-[#D2F1EB] text-teal-900"
                            : "text-gray-600 hover:bg-white/50"
                    }
                  `}
                            >
                                {item.name}
                                {isActive && (
                                    <div className="h-2 w-2 rounded-full bg-teal-600" />
                                )}
                            </Link>
                        );
                    })}
                </motion.div>
            )}
        </nav>
    );
}
