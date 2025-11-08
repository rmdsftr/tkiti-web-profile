"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Pagination from "@/components/pagination";
import CardArticle from "@/layouts/card-article";
import styles from "@/styles/article-page.module.css";
import img from "@/assets/header.jpeg";


const articlesDummy = [
  {
    id: 1,
    gambar: img,
    judul: "Implementasi Deep Learning untuk Klasifikasi Gambar Medis",
    seen: 1250,
    tanggal: "15 Oktober 2024"
  },
  {
    id: 2,
    gambar: img,
    judul: "Keamanan Siber di Era Digital: Tantangan dan Solusi",
    seen: 890,
    tanggal: "12 Oktober 2024"
  },
  {
    id: 3,
    gambar: img,
    judul: "Quantum Computing: Masa Depan Komputasi yang Revolusioner",
    seen: 2100,
    tanggal: "10 Oktober 2024"
  },
  {
    id: 4,
    gambar: img,
    judul: "Analisis Big Data untuk Pengambilan Keputusan Bisnis",
    seen: 1560,
    tanggal: "8 Oktober 2024"
  },
  {
    id: 5,
    gambar: img,
    judul: "Etika dalam Pengembangan Artificial Intelligence",
    seen: 975,
    tanggal: "5 Oktober 2024"
  },
  {
    id: 6,
    gambar: img,
    judul: "Smart City: Transformasi Digital untuk Kota Masa Depan",
    seen: 1320,
    tanggal: "3 Oktober 2024"
  },
  {
    id: 7,
    gambar: img,
    judul: "Kolaborasi Manusia dan AI dalam Lingkungan Kerja Modern",
    seen: 780,
    tanggal: "1 Oktober 2024"
  },
  {
    id: 8,
    gambar: img,
    judul: "Sistem Informasi Kesehatan: Meningkatkan Pelayanan Medis",
    seen: 1450,
    tanggal: "28 September 2024"
  },
  {
    id: 9,
    gambar: img,
    judul: "Robotika dalam Industri Manufaktur 4.0",
    seen: 1680,
    tanggal: "25 September 2024"
  },
  {
    id: 10,
    gambar: img,
    judul: "High-Performance Computing untuk Simulasi Kompleks",
    seen: 920,
    tanggal: "22 September 2024"
  },
  {
    id: 11,
    gambar: img,
    judul: "Software Engineering: Best Practices dan Metodologi Agile",
    seen: 1100,
    tanggal: "20 September 2024"
  },
  {
    id: 12,
    gambar: img,
    judul: "Simulasi Plasma untuk Penelitian Energi Fusi",
    seen: 650,
    tanggal: "18 September 2024"
  },
  {
    id: 13,
    gambar: img,
    judul: "Information Governance dalam Era Data Privacy",
    seen: 840,
    tanggal: "15 September 2024"
  },
  {
    id: 14,
    gambar: img,
    judul: "Elektromagnetik: Aplikasi dalam Teknologi Wireless",
    seen: 1230,
    tanggal: "12 September 2024"
  },
  {
    id: 15,
    gambar: img,
    judul: "Enterprise Systems: Integrasi dan Optimalisasi Proses Bisnis",
    seen: 1520,
    tanggal: "10 September 2024"
  }
];

export default function ArticlesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articlesDummy.slice(indexOfFirstArticle, indexOfLastArticle);

  
  const totalPages = Math.ceil(articlesDummy.length / articlesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.div 
        className={styles.container}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {currentArticles.map((article, index) => (
          <motion.div
            key={article.id}
            variants={{
              hidden: { 
                opacity: 0, 
                y: 20,
                scale: 0.95
              },
              visible: { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.5,
                  ease: "easeOut"
                }
              }
            }}
          >
            <CardArticle
              gambar={article.gambar}
              judul={article.judul}
              seen={article.seen}
              tanggal={article.tanggal}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}