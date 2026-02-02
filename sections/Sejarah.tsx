import Image from "next/image";
import illustration from "@/assets/illustrations/server-illustration.png";

const themeColor = "#D2F1EB";
const wavePath = "M965.45 96.9442C1210.41 -78.5767 1703.9 23.8105 1920.03 96.9442V917.273C1715.36 847.952 1237.91 750.902 965.45 917.273C692.995 1083.64 207.896 986.595 -0.597534 917.273V96.9442C219.353 170.078 720.492 272.465 965.45 96.9442Z";

export default function Sejarah() {
    return (
        <section id="sejarah" className="w-full relative py-4">
            
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

            <div className="w-full relative z-10" style={{ backgroundColor: themeColor }}>
                <div className="container mx-auto px-6 lg:px-12 py-8 md:py-12">
                    
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-8">
                        <div className="w-full lg:w-1/2 flex justify-center md:top-32">
                            <Image
                                src={illustration}
                                alt="Ilustrasi Server"
                                className="w-full md:w-[600px] object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            />
                        </div>

                        <div className="w-full lg:w-1/2 space-y-6 lg:pl-20">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-black text-center md:text-left tracking-tighter">
                                SEJARAH
                            </h2>

                            <div className="space-y-4 text-justify leading-relaxed text-sm md:text-base text-gray-600">
                                <p>
                                    Perjalanan Laboratorium Tata Kelola dan Infrastruktur Teknologi Informasi berawal pada 3 Februari 2016, ketika di Fakultas Teknologi Informasi didirikan sebuah laboratorium bernama Laboratorium Dasar Sistem Informasi (LDSI). Kepala laboratorium pertama adalah Bapak Fajril Akbar, M.T., dengan Kevin Valdi Arrestino sebagai koordinator asisten pertama.
                                </p>
                                <p>
                                    Sekitar tahun 2017–2018, laboratorium ini mengalami perubahan nama menjadi Laboratorium Dasar Komputasi (LDKOM). Hingga kini, LDKOM telah melahirkan sepuluh angkatan asisten laboratorium yang berperan dalam mendukung kegiatan praktikum dan riset dasar di bidang komputasi.
                                </p>
                                <p>
                                    Pada semester ganjil tahun 2024, terjadi perubahan besar dalam struktur organisasi, jabatan, dan fokus keilmuan di Departemen Sistem Informasi. Perubahan ini berlangsung di bawah kepemimpinan Bapak Ricky Akbar, M.Kom. sebagai Kepala Departemen Sistem Informasi yang baru, serta Ibu Dr. Eng. Lusi Susanti, S.T., M.Eng. sebagai Dekan baru Fakultas Teknologi Informasi.
                                </p>
                                <p>
                                    Sistem laboratorium yang baru tersebut menetapkan spesifikasi kelompok keilmuan untuk masing-masing laboratorium. Dari sinilah lahir Laboratorium Tata Kelola dan Infrastruktur Teknologi Informasi, yang merupakan kelanjutan dari LDKOM, dengan Bapak Adi Arga Arifnur, M.Kom. sebagai kepala laboratorium dan fokus pada pengelolaan strategis serta infrastruktur teknologi informasi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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