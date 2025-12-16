"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RepositoryCard from "@/components/repository-card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import inter from "@/fonts/inter";
import placeholder from "@/assets/gallery/placeholder.png";

// Badge color map (dipindah ke sini agar bisa dipakai di filter)
const badgeColorMap: { [key: string]: string } = {
  prestasi: "bg-[#fcba03] text-white",
  publikasi: "bg-[#6836ff] text-white",
  proyek: "bg-[#11AEAF] text-white",
};

// Opsi filter
const filterOptions = [
  { value: "all", label: "Semua" },
  { value: "prestasi", label: "Prestasi" },
  { value: "publikasi", label: "Publikasi" },
  { value: "proyek", label: "Proyek" },
];

// Sample data repository
const repositories = [
  {
    id: "1",
    title: "Juara 1 Gemastik Smart City 2025",
    description:
      "Prestasi gemilang tim TKITI dalam kompetisi Gemastik 2025 dengan solusi smart city yang inovatif dan terintegrasi dengan teknologi IoT terkini.",
    image: placeholder,
    badge: {
      label: "Prestasi",
      color: "prestasi",
    },
    contributors: [{ name: "Abrar" }, { name: "Fachri" }],
    documentationLinks: [
      { label: "www.human.com", url: "https://www.human.com" },
      { label: "www.bungou-stray-dogs.com", url: "https://www.bungou-stray-dogs.com" },
    ],
  },
  {
    id: "2",
    title: "Smart Infrastructure Management System",
    description:
      "Sistem manajemen infrastruktur pintar untuk monitoring dan optimasi jaringan komputer dengan dashboard real-time dan automated alerts.",
    image: placeholder,
    badge: {
      label: "Proyek",
      color: "proyek",
    },
    contributors: [{ name: "Rizka" }, { name: "Siti" }],
    documentationLinks: [
      { label: "github.com/smart-infra", url: "https://github.com/smart-infra" },
      { label: "docs.smart-infra.io", url: "https://docs.smart-infra.io" },
    ],
  },
  {
    id: "3",
    title: "Network Governance Framework",
    description:
      "Publikasi penelitian tentang framework tata kelola jaringan dengan standar internasional dan best practices dalam IT governance yang komprehensif.",
    image: placeholder,
    badge: {
      label: "Publikasi",
      color: "publikasi",
    },
    contributors: [{ name: "Alifia" }, { name: "Riski" }],
    documentationLinks: [
      { label: "framework.tkiti.io", url: "https://framework.tkiti.io" },
      { label: "wiki.tkiti.io", url: "https://wiki.tkiti.io" },
    ],
  },
];

export default function RepositoryPage() {
  const [filter, setFilter] = useState<"all" | "prestasi" | "publikasi" | "proyek">("all");

  // Filter repository berdasarkan badge.color
  const filteredRepositories = repositories.filter((repo) => {
    if (filter === "all") return true;
    return repo.badge?.color === filter;
  });

  return (
    <main className={inter.variable}>
      <Navbar />

      {/* Hero & Filter Section */}
      <section className="px-8 md:px-24 lg:px-32 pt-24 md:pt-32 pb-12 md:pb-16 bg-white">
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-extrabold tracking-tighter leading-tight text-black mb-3">
            REPOSITORY
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700">
            Koleksi lengkap dokumentasi proyek, publikasi, dan prestasi dari Laboratorium Tata Kelola dan Infrastruktur Teknologi Informasi.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value as any)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300 shadow-sm hover:shadow-md ${
                filter === option.value
                  ? option.value === "all"
                    ? "bg-gray-800 text-white"
                    : badgeColorMap[option.value as keyof typeof badgeColorMap]
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Repository Cards with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter} // Biar animasi ulang saat filter berubah
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6"
          >
            {filteredRepositories.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-500 text-lg font-medium">
                  Tidak ada repository dengan kategori ini.
                </p>
              </div>
            ) : (
              filteredRepositories.map((repo, idx) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <RepositoryCard {...repo} />
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />
    </main>
  );
}