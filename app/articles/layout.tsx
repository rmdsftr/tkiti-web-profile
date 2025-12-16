import Navbar from "@/components/Navbar";
import FilterDropdown from "@/components/filter";
import Search from "@/components/search";
import SidebarArticleClient from "@/sections/sidebar-article-client";
import HeroArticles from "@/components/hero-articles";
import styles from "@/styles/articles-layout.module.css";
import { prisma } from "@/lib/db";
import { article_status_article } from "@prisma/client";

interface TagFromDB {
    tag: string | null;
}

async function getTags(): Promise<string[]> {
    try {
        const tags = await prisma.tags.findMany({
            select: {
                tag: true,
            },
            orderBy: {
                total_article: 'desc', 
            },
            where: {
                article_tag:{
                    some: {
                        article: {
                            status_article: article_status_article.published
                        }
                    }
                }
            }
        });
   
        const tagList = tags
            .map((t: TagFromDB) => t.tag)
            .filter((tag: string | null): tag is string => tag !== null);

        return ["Semua", ...tagList];
    } catch (error) {
        console.error("Error fetching tags:", error);
        return ["Semua"];
    }
}

async function getStats() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stats`, {
            cache: 'no-store', 
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch stats');
        }
        
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching stats:", error);
        return {
            totalArticles: 0,
            totalTags: 0,
            totalViews: 0,
        };
    }
}

export default async function ArticlesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    
    const [categories, stats] = await Promise.all([
        getTags(),
        getStats(),
    ]);

    return (
        <>
        <Navbar />
        <div className={styles.container}>
        <HeroArticles 
            totalArtikel={stats.totalArticles}
            totalTags={stats.totalTags}
            totalViews={stats.totalViews}
        />
        
        <main className={styles.main}>
        <div className={styles.sidebar}>
        <SidebarArticleClient ListCategory={categories} /> 
        </div>
        
        <div className={styles.contentWrapper}>
        <div className={styles.controls}>
        <FilterDropdown />
        <Search />
        </div>
        
        <div className={styles.content}>
        {children}
        </div>
        </div>
        </main>
        </div>
        </>
    );
}