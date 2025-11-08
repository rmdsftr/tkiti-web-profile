import styles from "@/styles/sejarah.module.css";
import inter from "@/fonts/inter";
import { motion } from "framer-motion";

export function SejarahLayout(){
    return(
        <div className={`${styles.container} ${inter.variable}`}>
            <motion.div 
                className={styles.p}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            >
                <h1>SEJARAH</h1>
            </motion.div>
            <motion.div 
                className={styles.p}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            >
                <p>
                    Perjalanan Laboratorium Tata Kelola dan Infrastruktur Teknologi Informasi berawal pada 3 Februari 2016, ketika di Fakultas Teknologi Informasi didirikan sebuah laboratorium bernama Laboratorium Dasar Sistem Informasi (LDSI). Kepala laboratorium pertama adalah Bapak Fajril Akbar, M.T., dengan Kevin Valdi Arrestino sebagai koordinator asisten pertama.
                    <br /> <br />
                    Sekitar tahun 2017–2018, laboratorium ini mengalami perubahan nama menjadi Laboratorium Dasar Komputasi (LDKOM). Hingga kini, LDKOM telah melahirkan sepuluh angkatan asisten laboratorium yang berperan dalam mendukung kegiatan praktikum dan riset dasar di bidang komputasi.
                    <br /> <br />
                    Pada semester ganjil tahun 2024, terjadi perubahan besar dalam struktur organisasi, jabatan, dan fokus keilmuan di Departemen Sistem Informasi. Perubahan ini berlangsung di bawah kepemimpinan Bapak Ricky Akbar, M.Kom. sebagai Kepala Departemen Sistem Informasi yang baru, serta Ibu Dr. Eng. Lusi Susanti, S.T., M.Eng. sebagai Dekan baru Fakultas Teknologi Informasi.
                    <br /> <br />
                    Sistem laboratorium yang baru tersebut menetapkan spesifikasi kelompok keilmuan untuk masing-masing laboratorium. Dari sinilah lahir Laboratorium Tata Kelola dan Infrastruktur Teknologi Informasi, yang merupakan kelanjutan dari LDKOM, dengan Bapak Adi Arga Arifnur, M.Kom. sebagai kepala laboratorium dan fokus pada pengelolaan strategis serta infrastruktur teknologi informasi.
                </p>
            </motion.div>
        </div>
    )
}