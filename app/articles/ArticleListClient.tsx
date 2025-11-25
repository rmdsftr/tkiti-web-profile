"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";
import CardArticle from "@/sections/card-article";
import styles from "@/styles/article-page.module.css";

interface Article {
    id: string;
    gambar: string | null;
    judul: string;
    seen: number;
    tanggal: Date; 
}

interface ArticleListClientProps {
    initialArticles: Article[];
    initialFilter: string;
}

export default function ArticleListClient({ initialArticles, initialFilter }: ArticleListClientProps) {
    const searchParams = useSearchParams();
    const currentFilter = searchParams.get('filter') || 'latest';
    const currentTag = searchParams.get('tag') || 'Semua';
    const currentSearch = searchParams.get('search') || '';
    const router = useRouter();
    
    const [articles, setArticles] = useState<Article[]>(initialArticles); 
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const articlesPerPage = 10;
    
    useEffect(() => {
        const fetchArticles = async () => {
            console.log('Fetching articles with:', { 
                filter: currentFilter, 
                tag: currentTag,
                search: currentSearch 
            });
            setIsLoading(true);
            try {
                const queryParams = new URLSearchParams();
                queryParams.set('filter', currentFilter);
                
                if (currentTag && currentTag !== 'Semua') {
                    queryParams.set('tag', currentTag);
                }
                
                if (currentSearch) {
                    queryParams.set('search', currentSearch);
                }
                
                const response = await fetch(`/api/articles?${queryParams.toString()}`);
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    console.error('API Error:', response.status, errorData);
                    throw new Error(`Failed to fetch: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched articles count:', data.length);
                setArticles(data);
                setCurrentPage(1); 
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, [currentFilter, currentTag, currentSearch]); 
    
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
    
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    if (isLoading) {
        return (
            <div className={styles.container}>
                <p>Memuat artikel...</p>
            </div>
        );
    }
    
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
        {currentArticles.length === 0 ? (
            <div className={styles.emptyState}>
                <p>
                    {currentSearch 
                        ? `Tidak ada artikel yang ditemukan untuk "${currentSearch}"` 
                        : 'Tidak ada artikel yang ditemukan.'}
                </p>
            </div>
        ) : (
            currentArticles.map((article: Article) => ( 
                <motion.div
                key={article.id}
                onClick={() => router.push(`/a/${article.id}`)}
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
            ))
        )}
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