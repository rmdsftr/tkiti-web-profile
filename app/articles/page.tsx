import ArticleListClient from './ArticleListClient';
import { prisma } from "@/lib/db"; 

interface Article {
    id: string;
    gambar: string | null;
    judul: string;
    seen: number;
    tanggal: Date; 
}

async function getArticles(
    filter: 'latest' | 'popular', 
    tag?: string,
    search?: string
): Promise<Article[]> {
    let orderBy: { [key: string]: 'desc' | 'asc' } = { created_at: "desc" };
    
    if (filter === "popular") {
        orderBy = { views: "desc" }; 
    } else {
        orderBy = { created_at: "desc" };
    }
    
    try {
        const whereClause: any = {};
        
        
        if (tag && tag !== 'Semua') {
            whereClause.article_tag = {
                some: {
                    tags: {
                        tag: tag
                    }
                }
            };
        }
        
        
        if (search && search.trim()) {
            whereClause.OR = [
                {
                    judul: {
                        contains: search.trim(),
                        mode: 'insensitive' 
                    }
                },
                {
                    isi: {
                        contains: search.trim(),
                        mode: 'insensitive'
                    }
                }
            ];
        }
        
        const articles = await prisma.article.findMany({
            where: whereClause,
            select: {
                article_id: true,
                judul: true,
                photo_url: true,
                views: true,
                created_at: true,
            },
            orderBy: orderBy,
        });
        
        const formattedArticles: Article[] = articles.map((article: {
            article_id: string;
            judul: string | null;
            photo_url: string | null;
            views: number | null;
            created_at: Date;
        }) => ({
            id: article.article_id,
            gambar: article.photo_url,
            judul: article.judul || "Tanpa Judul",
            seen: article.views || 0,
            tanggal: article.created_at,
        }));
        
        return formattedArticles;
    } catch (error) {
        console.error("Error fetching articles in Server Component:", error);
        return [];
    }
}

export default async function ArticlesPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const filterParam = searchParams.filter;
    const tagParam = searchParams.tag;
    const searchParam = searchParams.search;
    
    const filter: 'latest' | 'popular' = (filterParam === 'popular') ? 'popular' : 'latest'; 
    const tag = typeof tagParam === 'string' ? tagParam : undefined;
    const search = typeof searchParam === 'string' ? searchParam : undefined;
    
    const initialArticles = await getArticles(filter, tag, search);
    
    return (
        <ArticleListClient 
        initialArticles={initialArticles} 
        initialFilter={filter}
        />
    );
}