"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Users, Briefcase, BookOpen, Home } from "lucide-react";

import Button from "@/components/Button";
import illustration from "@/assets/illustrations/struktur-illustrations.png";

const themeColor = "#D2F1EB";
const wavePath = "M965.45 96.9442C1210.41 -78.5767 1703.9 23.8105 1920.03 96.9442V917.273C1715.36 847.952 1237.91 750.902 965.45 917.273C692.995 1083.64 207.896 986.595 -0.597534 917.273V96.9442C219.353 170.078 720.492 272.465 965.45 96.9442Z";

const topLevelData = [
    {
        role: "Kepala Laboratorium",
        name: "Nama Kepala Lab",
        icon: User,
        color: "text-[#11AEAF]",
        bg: "bg-[#11AEAF]/10",
    },
    {
        role: "Dosen Laboratorium",
        name: "Nama Dosen 1",
        icon: User,
        color: "text-[#11AEAF]",
        bg: "bg-[#11AEAF]/10",
    },
    {
        role: "Dosen Laboratorium",
        name: "Nama Dosen 2",
        icon: User,
        color: "text-[#11AEAF]",
        bg: "bg-[#11AEAF]/10",
    },
];

const structureData = [
    {
        role: "Koordinator Asisten",
        name: "Nama Kordas",
        icon: User,
        color: "text-[#11AEAF]",
        bg: "bg-[#11AEAF]/10",
    },
    {
        role: "Sekretaris",
        name: "Nama Sekretaris",
        icon: BookOpen,
        color: "text-[#11AEAF]",
        bg: "bg-[#11AEAF]/10",
    },
    {
        role: "Bendahara",
        name: "Nama Bendahara",
        icon: Briefcase,
        color: "text-[#11AEAF]",
        bg: "bg-[#11AEAF]/10",
    },
];

const divisionsData = [
    {
        name: "Divisi Rumah Tangga",
        coordinator: "Nama Koordinator",
        members: ["Anggota 1", "Anggota 2", "Anggota 3"],
        icon: Home,
        color: "text-[#11AEAF]",
        bg: "bg-[#11AEAF]/10",
    },
    {
        name: "Divisi Pelatihan & Pengembangan",
        coordinator: "Nama Koordinator",
        members: ["Anggota 1", "Anggota 2", "Anggota 3"],
        icon: Users,
        color: "text-[#11AEAF]",
        bg: "bg-[#11AEAF]/10",
    },
    {
        name: "Divisi Pengabdian & Pelatihan",
        coordinator: "Nama Koordinator",
        members: ["Anggota 1", "Anggota 2", "Anggota 3"],
        icon: Users,
        color: "text-[#11AEAF]",
        bg: "bg-[#11AEAF]/10",
    },
];

export default function Struktur() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="w-full relative py-4">
            
            <div className="w-full leading-0 -mb-px">
                <svg
                    className="w-full h-24 md:h-48 lg:h-80 block border-none"
                    viewBox="0 -100 1920 300" 
                    preserveAspectRatio="xMidYMax slice"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d={wavePath}
                        fill={themeColor}
                        stroke="none"
                    />
                </svg>
            </div>

            <div className="w-full relative z-10" style={{ backgroundColor: themeColor }}>
                <div className="container mx-auto px-6 lg:px-12 py-8 md:py-12">
                    
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-8">
                        <div className="w-full lg:w-1/2 justify-center md:top-32 hidden md:flex">
                            <Image
                                src={illustration}
                                alt="Ilustrasi Struktur"
                                className="w-full md:w-[600px] object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            />
                        </div>

                        <div className="w-full lg:w-1/2 space-y-6 lg:pl-20">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-black text-center md:text-left tracking-tighter">
                                STRUKTUR KEPENGURUSAN
                            </h2>

                            <div className="space-y-4 text-justify leading-relaxed text-sm md:text-base text-gray-600">
                                <p>
                                    Lab Tata Kelola dan Infrastruktur Teknologi Informasi DSI memiliki struktur kepengurusan yang tersusun secara hierarkis untuk mendukung kelancaran kegiatan akademik, penelitian, dan pengabdian. Struktur ini terdiri dari Kepala Lab sebagai penanggung jawab utama, dibantu oleh Dosen Keilmuan yang memberikan arahan dan pembinaan. Di bawahnya terdapat Koordinator Asisten yang mengatur kegiatan teknis serta Sekretaris yang mengelola administrasi. Struktur ini juga mencakup tiga divisi fungsional, yaitu Divisi Penelitian dan Pengembangan, Divisi Pengabdian dan Pelatihan, serta Divisi Rumah Tangga, yang masing-masing memiliki peran khusus untuk memastikan operasional laboratorium berjalan optimal dan terarah.
                                </p>

                                <div onClick={() => setIsModalOpen(true)}>
                                    <Button variant="primary" size="large">
                                        LIHAT LEBIH DETAIL
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full leading-0 -mt-px">
                <svg
                    className="w-full h-24 md:h-48 lg:h-80 block border-none"
                    viewBox="0 800 1920 400" 
                    preserveAspectRatio="xMidYMin slice"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d={wavePath}
                        fill={themeColor}
                        stroke="none"
                    />
                </svg>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                    Struktur Kepengurusan
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    <X size={24} className="text-gray-500" />
                                </button>
                            </div>

                            <div className="overflow-y-auto p-6 md:p-8 space-y-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                                
                                <div className="space-y-4">
                                    <h4 className="text-lg font-bold text-gray-900 border-l-4 border-[#11AEAF] pl-3">
                                        Pimpinan Laboratorium
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {topLevelData.map((item, index) => (
                                            <div key={index} className="flex items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                                <div className={`p-3 rounded-full ${item.bg} mr-4`}>
                                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 font-medium">{item.role}</p>
                                                    <p className="text-lg font-bold text-gray-900">{item.name}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-lg font-bold text-gray-900 border-l-4 border-[#11AEAF] pl-3">
                                        Pengurus Harian
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {structureData.map((item, index) => (
                                            <div key={index} className="flex items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                                <div className={`p-3 rounded-full ${item.bg} mr-4`}>
                                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 font-medium">{item.role}</p>
                                                    <p className="text-lg font-bold text-gray-900">{item.name}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-lg font-bold text-gray-900 border-l-4 border-[#11AEAF] pl-3">
                                        Divisi Fungsional
                                    </h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {divisionsData.map((division, index) => (
                                            <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
                                                <div className={`p-4 ${division.bg} border-b border-gray-100/50 flex items-center gap-3`}>
                                                    <division.icon className={`w-5 h-5 ${division.color}`} />
                                                    <h5 className="font-bold text-gray-800 text-sm">{division.name}</h5>
                                                </div>
                                                <div className="p-4 flex-grow">
                                                    <div className="mb-4 pb-3 border-b border-gray-100">
                                                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Koordinator</p>
                                                        <p className="text-gray-900 font-bold text-sm">{division.coordinator}</p>
                                                    </div>

                                                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-2">Anggota</p>
                                                    <ul className="space-y-2">
                                                        {division.members.map((member, idx) => (
                                                            <li key={idx} className="flex items-center text-gray-600 text-sm">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2" />
                                                                {member}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            
        </section>
    );
}