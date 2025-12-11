import Image from "next/image";

import Button from "@/components/Button";

import illustration from "@/assets/illustrations/struktur-illustrations.png";

const themeColor = "#D2F1EB";
const wavePath = "M965.45 96.9442C1210.41 -78.5767 1703.9 23.8105 1920.03 96.9442V917.273C1715.36 847.952 1237.91 750.902 965.45 917.273C692.995 1083.64 207.896 986.595 -0.597534 917.273V96.9442C219.353 170.078 720.492 272.465 965.45 96.9442Z";

export default function Struktur() {
    return (
        <section className="w-full relative py-4">
            
            {/* Wave Atas */}
            <div className="w-full leading-0 -mb-px">
                <svg
                    className="w-full h-24 md:h-48 lg:h-80 block"
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

            {/* Body */}
            <div className="w-full relative z-10" style={{ backgroundColor: themeColor }}>
                <div className="container mx-auto px-6 lg:px-12 py-8 md:py-12">
                    
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-15">
                        {/* Left Image */}
                        <div className="w-full lg:w-1/2 justify-center md:top-32 hidden md:flex">
                            <Image
                                src={illustration}
                                alt="Ilustrasi Struktur"
                                className="w-full md:w-[600px] object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            />
                        </div>

                        {/* Right Content */}
                        <div className="w-full lg:w-1/2 space-y-6 text-gray-800">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-black text-center md:text-left tracking-tighter">
                                STRUKTUR KEPENGURUSAN
                            </h2>

                            <div className="space-y-4 text-justify leading-relaxed text-sm md:text-base">
                                <p>
                                    Lab Tata Kelola dan Infrastruktur Teknologi Informasi DSI memiliki struktur kepengurusan yang tersusun secara hierarkis untuk mendukung kelancaran kegiatan akademik, penelitian, dan pengabdian. Struktur ini terdiri dari Kepala Lab sebagai penanggung jawab utama, dibantu oleh Dosen Keilmuan yang memberikan arahan dan pembinaan. Di bawahnya terdapat Koordinator Asisten yang mengatur kegiatan teknis serta Sekretaris yang mengelola administrasi. Struktur ini juga mencakup tiga divisi fungsional, yaitu Divisi Penelitian dan Pengembangan, Divisi Pengabdian dan Pelatihan, serta Divisi Rumah Tangga, yang masing-masing memiliki peran khusus untuk memastikan operasional laboratorium berjalan optimal dan terarah.
                                </p>

                                <Button variant="primary" size="large">
                                    LIHAT LEBIH DETAIL
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave Bawah */}
            <div className="w-full leading-0 -mt-px">
                <svg
                    className="w-full h-24 md:h-48 lg:h-80 block"
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
            
        </section>
    );
}