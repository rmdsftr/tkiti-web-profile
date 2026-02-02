"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import inter from "@/fonts/inter";

import imgMaintenanceServer from "@/assets/illustrations/maintenance-server-illustration.png";
import imgMaintenancePC from "@/assets/illustrations/maintenance-pc-illustration.png";
import imgMaintenanceServerArchitecture from "@/assets/illustrations/maintenance-server-architecture-illustration.png";
import imgHosting from "@/assets/illustrations/hosting-illustration.png";

const activities = [
    {
        title: "Maintenance Server",
        desc: "Kami rutin melakukan perawatan server untuk memastikan seluruh sistem berjalan stabil dan aman. Kegiatan ini meliputi pembaruan sistem operasi, pengecekan kesehatan hardware, optimasi performa layanan, serta monitoring beban kerja secara real-time. Dengan pemeliharaan yang terjadwal dan terukur, kami dapat meminimalkan risiko downtime dan menjaga ketersediaan layanan 24/7.",
        image: imgMaintenanceServer,
    },
    {
        title: "Perawatan Komputer Laboratorium",
        desc: "Kami rutin melakukan perawatan komputer di laboratorium untuk memastikan seluruh perangkat siap digunakan mahasiswa dan staf. Proses ini meliputi pengecekan hardware, pembersihan debu pada komponen, pembaruan sistem operasi, pengaturan ulang konfigurasi, serta penggantian komponen jika diperlukan.",
        image: imgMaintenancePC,
    },
    {
        title: "Manajemen Virtualisasi (Proxmox)",
        desc: "Pengelolaan arsitektur server dilakukan untuk memastikan seluruh layanan berjalan dengan efisien dan stabil. Aktivitas ini mencakup konfigurasi virtual machine, pengaturan alokasi CPU dan RAM, pemantauan performa, serta optimasi resource pada platform Proxmox.",
        image: imgMaintenanceServerArchitecture,
    },
    {
        title: "Layanan Hosting Proyek Mahasiswa",
        desc: "Kami menyediakan infrastruktur server untuk kebutuhan hosting proyek mahasiswa. Proses ini meliputi penyediaan environment, konfigurasi database, hingga deployment aplikasi agar dapat diakses secara online untuk kebutuhan praktikum maupun tugas akhir.",
        image: imgHosting,
    },
];

export default function Kegiatan() {
    return (
        <section
            className={`${inter.variable} w-full py-4 bg-white overflow-hidden`}
        >
            <div className="container mx-auto px-6 lg:px-12">
                <motion.h2
                    className="text-3xl md:text-4xl font-extrabold text-black mb-16 md:mb-24 tracking-tighter uppercase text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    KEGIATAN
                </motion.h2>

                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#11AEAF]/30 hidden lg:block rounded-full" />

                    <div className="flex flex-col gap-12 lg:gap-0">
                        <div className="flex flex-col gap-12 lg:gap-0">
                            {activities.map((item, index) => {
                                const isEven = index % 2 === 0;

                                return (
                                    <motion.div
                                        key={index}
                                        className={`relative flex flex-col-reverse items-center w-full lg:gap-0 gap-8 ${
                                            isEven
                                                ? "lg:flex-row"
                                                : "lg:flex-row-reverse"
                                        }`}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{
                                            once: true,
                                            margin: "-100px",
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            delay: index * 0.1,
                                        }}
                                    >
                                        <div
                                            className={`w-full lg:w-1/2 flex justify-center ${
                                                isEven
                                                    ? "lg:justify-end lg:pr-24"
                                                    : "lg:justify-start lg:pl-24"
                                            }`}
                                        >
                                            <div className="text-center lg:text-left space-y-4 max-w-lg">
                                                <h3 className="text-xl md:text-2xl font-bold text-black">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 items-center justify-center hidden lg:flex">
                                            <div className="w-4 h-4 bg-white border-[3px] border-[#11AEAF] rounded-full z-20 shadow-sm relative" />

                                            <div
                                                className={`absolute h-0.5 bg-[#11AEAF]/30 w-16 top-1/2 -translate-y-1/2 z-0
                                                ${isEven ? "right-1/2 mr-1" : "left-1/2 ml-1"}
                                            `}
                                            />
                                        </div>

                                        <div
                                            className={`w-full lg:w-1/2 flex justify-center ${
                                                isEven
                                                    ? "lg:justify-start lg:pl-24"
                                                    : "lg:justify-end lg:pr-24"
                                            }`}
                                        >
                                            <div className="relative w-full max-w-md aspect-video bg-[#D2F1EB]/30 rounded-2xl p-4 flex items-center justify-center overflow-hidden group hover:bg-[#D2F1EB]/50 transition-colors duration-500">
                                                <div className="absolute inset-0 bg-linear-to-br from-[#11AEAF]/5 to-transparent opacity-50" />

                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="object-contain w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
