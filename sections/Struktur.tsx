"use client";

import type { ComponentType } from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Users, Briefcase, BookOpen, Home, Loader2 } from "lucide-react";

import Button from "@/components/Button";
import illustration from "@/assets/illustrations/struktur-illustrations.png";

const themeColor = "#D2F1EB";
const wavePath = "M965.45 96.9442C1210.41 -78.5767 1703.9 23.8105 1920.03 96.9442V917.273C1715.36 847.952 1237.91 750.902 965.45 917.273C692.995 1083.64 207.896 986.595 -0.597534 917.273V96.9442C219.353 170.078 720.492 272.465 965.45 96.9442Z";

// ── Types ────────────────────────────────────────────────────────────────────

interface DosenItem {
    nip: string;
    nama_dosen: string;
    foto: string | null;
    posisi: "kepala" | "anggota";
}

interface DosenResponse {
    kepala: DosenItem[];
    anggota: DosenItem[];
}

interface PengurusItem {
    nim: string;
    nama: string;
    photo_url: string | null;
    jabatan: string;
    divisi: string;
}

interface StrukturResponse {
    periode: { id: string; nama: string } | null;
    inti: PengurusItem[];
    litbang: PengurusItem[];
    rtk: PengurusItem[];
    pengpel: PengurusItem[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const jabatanLabel: Record<string, string> = {
    kordas: "Koordinator Asisten",
    sekretaris: "Sekretaris",
    bendahara: "Bendahara",
    koordinator: "Koordinator",
    anggota: "Anggota",
};

const divisiLabel: Record<string, string> = {
    inti: "Pengurus Inti",
    litbang: "Divisi Penelitian & Pengembangan",
    rtk: "Divisi Rumah Tangga & Kompetisi",
    pengpel: "Divisi Pengabdian & Pelatihan",
};

const divisiIcon: Record<string, ComponentType<{ className?: string }>> = {
    litbang: Users,
    rtk: Home,
    pengpel: Users,
};

// ── Sub-components ───────────────────────────────────────────────────────────

function PersonCard({ name, role }: { name: string; role: string }) {
    return (
        <div className="flex items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 rounded-full bg-[#11AEAF]/10 mr-4">
                <User className="w-6 h-6 text-[#11AEAF]" />
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{role}</p>
                <p className="text-lg font-bold text-gray-900">{name}</p>
            </div>
        </div>
    );
}

function DivisionCard({
    title,
    icon: Icon,
    coordinator,
    members,
}: {
    title: string;
    icon: ComponentType<{ className?: string }>;
    coordinator: string | null;
    members: string[];
}) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
            <div className="p-4 bg-[#11AEAF]/10 border-b border-gray-100/50 flex items-center gap-3">
                <Icon className="w-5 h-5 text-[#11AEAF]" />
                <h5 className="font-bold text-gray-800 text-sm">{title}</h5>
            </div>
            <div className="p-4 flex-grow">
                {coordinator && (
                    <div className="mb-4 pb-3 border-b border-gray-100">
                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Koordinator</p>
                        <p className="text-gray-900 font-bold text-sm">{coordinator}</p>
                    </div>
                )}
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-2">Anggota</p>
                <ul className="space-y-2">
                    {members.length > 0 ? (
                        members.map((m, i) => (
                            <li key={i} className="flex items-center text-gray-600 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2" />
                                {m}
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-400 text-sm italic">Belum ada anggota</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#11AEAF] animate-spin" />
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Struktur() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dosenData, setDosenData] = useState<DosenResponse | null>(null);
    const [strukturData, setStrukturData] = useState<StrukturResponse | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch data when modal opens (lazy — only fetch when needed)
    useEffect(() => {
        if (!isModalOpen) return;
        if (dosenData && strukturData) return; // already loaded

        setLoading(true);

        Promise.all([
            fetch("/api/dosen").then((r) => r.json()),
            fetch("/api/struktur").then((r) => r.json()),
        ])
            .then(([dosen, struktur]: [DosenResponse, StrukturResponse]) => {
                setDosenData(dosen);
                setStrukturData(struktur);
            })
            .catch((err) => console.error("Gagal memuat data struktur:", err))
            .finally(() => setLoading(false));
    }, [isModalOpen]);

    // ── Derived display data ──────────────────────────────────────────────────

    // "Pimpinan Laboratorium": kepala dosen first, then anggota dosen
    const pimpinanCards: { role: string; name: string }[] = [];
    if (dosenData) {
        dosenData.kepala.forEach((d) =>
            pimpinanCards.push({ role: "Kepala Laboratorium", name: d.nama_dosen })
        );
        dosenData.anggota.forEach((d) =>
            pimpinanCards.push({ role: "Dosen Laboratorium", name: d.nama_dosen })
        );
    }

    // "Pengurus Harian": inti divisi — kordas, sekretaris, bendahara
    const harian: { role: string; name: string; icon: ComponentType<{ className?: string }> }[] = [];
    if (strukturData) {
        const intiOrder = ["kordas", "sekretaris", "bendahara", "koordinator", "anggota"];
        const sorted = [...strukturData.inti].sort(
            (a, b) => intiOrder.indexOf(a.jabatan) - intiOrder.indexOf(b.jabatan)
        );
        const iconMap: Record<string, ComponentType<{ className?: string }>> = {
            kordas: User,
            sekretaris: BookOpen,
            bendahara: Briefcase,
            koordinator: User,
            anggota: User,
        };
        sorted.forEach((p) =>
            harian.push({
                role: jabatanLabel[p.jabatan] ?? p.jabatan,
                name: p.nama,
                icon: iconMap[p.jabatan] ?? User,
            })
        );
    }

    // "Divisi Fungsional": litbang, rtk, pengpel
    const divisiFungsi = (["litbang", "rtk", "pengpel"] as const).map((div) => {
        const members = strukturData?.[div] ?? [];
        const coordinator = members.find((m) => m.jabatan === "koordinator");
        const anggotaList = members
            .filter((m) => m.jabatan !== "koordinator")
            .map((m) => m.nama);
        return {
            key: div,
            title: divisiLabel[div],
            icon: divisiIcon[div] ?? Users,
            coordinator: coordinator?.nama ?? null,
            members: anggotaList,
        };
    });

    return (
        <section className="w-full relative py-4">
            <div className="w-full leading-0 -mb-px">
                <svg
                    className="w-full h-24 md:h-48 lg:h-80 block border-none"
                    viewBox="0 -100 1920 300"
                    preserveAspectRatio="xMidYMax slice"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d={wavePath} fill={themeColor} stroke="none" />
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
                    <path d={wavePath} fill={themeColor} stroke="none" />
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
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                        Struktur Kepengurusan
                                    </h3>
                                    {strukturData?.periode && (
                                        <p className="text-sm text-gray-500 mt-0.5">
                                            Periode {strukturData.periode.nama}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    <X size={24} className="text-gray-500" />
                                </button>
                            </div>

                            <div className="overflow-y-auto p-6 md:p-8 space-y-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                                {loading ? (
                                    <LoadingSpinner />
                                ) : (
                                    <>
                                        {/* Pimpinan Laboratorium */}
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-bold text-gray-900 border-l-4 border-[#11AEAF] pl-3">
                                                Pimpinan Laboratorium
                                            </h4>
                                            {pimpinanCards.length > 0 ? (
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {pimpinanCards.map((item, index) => (
                                                        <PersonCard key={index} name={item.name} role={item.role} />
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-400 italic text-sm">Belum ada data dosen.</p>
                                            )}
                                        </div>

                                        {/* Pengurus Harian */}
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-bold text-gray-900 border-l-4 border-[#11AEAF] pl-3">
                                                Pengurus Harian
                                            </h4>
                                            {harian.length > 0 ? (
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {harian.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                                                        >
                                                            <div className="p-3 rounded-full bg-[#11AEAF]/10 mr-4">
                                                                <item.icon className="w-6 h-6 text-[#11AEAF]" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-500 font-medium">{item.role}</p>
                                                                <p className="text-lg font-bold text-gray-900">{item.name}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-400 italic text-sm">Belum ada data pengurus harian.</p>
                                            )}
                                        </div>

                                        {/* Divisi Fungsional */}
                                        <div className="space-y-6">
                                            <h4 className="text-lg font-bold text-gray-900 border-l-4 border-[#11AEAF] pl-3">
                                                Divisi Fungsional
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {divisiFungsi.map((div) => (
                                                    <DivisionCard
                                                        key={div.key}
                                                        title={div.title}
                                                        icon={div.icon}
                                                        coordinator={div.coordinator}
                                                        members={div.members}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}