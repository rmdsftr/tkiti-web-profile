"use client";

import Image from "next/image";
import { FaEye, FaPen, FaRegCalendarTimes } from "react-icons/fa";
import styles from "@/styles/read-article.module.css";
import inter from "@/fonts/inter";
import CardRekomendasi from "@/layouts/card-rekomendasi";
import FloatingBackButton from "@/components/floating-back";
import { motion, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

interface ArticleData {
  article_id: string;
  judul: string;
  photo_url: string;
  content: string;
  views: number;
  created_at: string;
  updated_at: string;
  penulis: string;
  nim: string;
  tags: Array<{ tag_id: number; tag: string }>;
}

interface RecommendationData {
  article_id: string;
  judul: string;
  photo_url: string;
  created_at: string;
}

export default function ArticlesDetailPage() {
  const params = useParams();
  const articleId = params.slug as string;
  
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const viewTracked = useRef(false);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/articles/${articleId}`);
        
        if (!response.ok) {
          throw new Error('Artikel tidak ditemukan');
        }
        
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoadingRecs(true);
        const response = await fetch(`/api/articles/${articleId}/recommendations`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Recommendations data:', data); 
          setRecommendations(data);
        } else {
          console.error('Failed to fetch recommendations:', response.status);
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoadingRecs(false);
      }
    };

    if (articleId && article) {
      fetchRecommendations();
    }
  }, [articleId, article]);

  
  useEffect(() => {
    if (!article) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      
      if (progress > 70 && !viewTracked.current) {
        viewTracked.current = true;
        
        
        if (scrollTimer.current) {
          clearTimeout(scrollTimer.current);
        }
        
        scrollTimer.current = setTimeout(async () => {
          try {
            await fetch(`/api/articles/${articleId}/views`, {
              method: 'POST',
            });
          } catch (error) {
            console.error('Error tracking view:', error);
          }
        }, 2000); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, [article, articleId]);

  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  const tagVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
    return date.toLocaleDateString('id-ID', options);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta',
    }) + ' WIB';
  };

  
  const handleRecommendationClick = (id: string) => {
    window.location.href = `/a/${id}`;
  };
  const contentParagraphs = article?.content 
    ? article.content.split('\n').filter(p => p.trim() !== '')
    : [];

  if (loading) {
    return (
      <div className={styles.main}>
        <div className={`${inter.variable} ${styles.container}`}>
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-pulse text-[#11AEAF] text-xl">
              Memuat artikel...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className={styles.main}>
        <FloatingBackButton />
        <div className={`${inter.variable} ${styles.container}`}>
          <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="text-red-500 text-xl mb-4">
              {error || 'Artikel tidak ditemukan'}
            </div>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-[#11AEAF] text-white rounded-lg hover:bg-[#0D8A8B] transition"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #11AEAF, #0D8A8B)',
          transformOrigin: '0%',
          zIndex: 9999,
          scaleX: scrollProgress / 100
        }}
        initial={{ scaleX: 0 }}
      />

      <FloatingBackButton />

      <motion.div
        className={`${inter.variable} ${styles.container}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        <motion.div
          variants={imageVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={article.photo_url}
            width={750}
            height={150}
            alt={article.judul}
            className={styles.img}
          />
        </motion.div>
        <br />

        
        <motion.h1 variants={itemVariants}>
          {article.judul}
        </motion.h1>

        
        <motion.div 
          className={styles.detail}
          variants={containerVariants}
        >
          {[
            { icon: FaEye, text: `${article.views} kali` },
            { 
              icon: FaRegCalendarTimes, 
              text: `${formatDate(article.created_at)} | ${formatTime(article.created_at)}` 
            },
            { icon: FaPen, text: article.penulis }
          ].map((item, index) => (
            <motion.div
              key={index}
              className={styles.icon}
              variants={itemVariants}
              whileHover={{ scale: 1.05, x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <item.icon color="#11AEAF" />
              <p>{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
        <br />

        
        <motion.div 
          className={styles.paragraf}
          variants={containerVariants}
        >
          {contentParagraphs.map((paragraf, index) => (
            <motion.p
              key={index}
              className="text-justify leading-relaxed text-gray-700"
              variants={itemVariants}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {paragraf}
            </motion.p>
          ))}
        </motion.div>
        <br />

        
        <motion.hr
          className="border-t border-gray-200 my-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        
        <motion.div
          className={styles.tags}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
        >
          {article.tags.map((tag) => (
            <motion.div
              key={tag.tag_id}
              className={styles.tag}
              variants={tagVariants}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#11AEAF",
                color: "#fff",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <p>{tag.tag}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      
      <motion.div
        className={styles.rekomendasi}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Rekomendasi Artikel
        </motion.h2>

        {loadingRecs ? (
          <div className="text-center py-4 text-gray-500">
            Memuat rekomendasi...
          </div>
        ) : recommendations.length > 0 ? (
          recommendations.map((item, index) => (
            <motion.div
              key={item.article_id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
              whileHover={{ scale: 1.03, x: 10 }}
              onClick={() => handleRecommendationClick(item.article_id)}
              style={{ cursor: 'pointer' }}
            >
              <CardRekomendasi
                gambar={item.photo_url || ''}
                judul={item.judul || 'Untitled'}
                tanggal={formatDate(item.created_at)}
              />
            </motion.div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            Tidak ada rekomendasi artikel
          </div>
        )}
      </motion.div>
    </div>
  );
}