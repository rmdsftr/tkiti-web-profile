import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { article_status_article } from "@prisma/client";

interface ArticleFromDB {
    article_id: string;
    judul: string | null;
    photo_url: string | null;
    views: number | null;
    created_at: Date;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get('filter') || 'latest';
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    
    let orderBy: { [key: string]: 'desc' | 'asc' } = { created_at: "desc" };
    
    if (filter === "popular") {
        orderBy = { views: "desc" };
    } else {
        orderBy = { created_at: "desc" };
    }
    
    try {
        const whereClause: any = {};
        const andConditions: any[] = [];
          
        if (tag && tag !== 'Semua') {
            andConditions.push({
                article_tag: {
                    some: {
                        tags: {
                            tag: tag
                        }
                    }
                }
            });
        }
        
        
        if (search && search.trim()) {
            andConditions.push({
                OR: [
                    {
                        judul: {
                            contains: search.trim()
                        }
                    },
                    {
                        content: {
                            contains: search.trim()
                        }
                    }
                ]
            });
        }
        
        
        if (andConditions.length > 0) {
            whereClause.AND = andConditions;
        }
        
        const articles = await prisma.article.findMany({
            where: {
                ...whereClause,
                status_article: article_status_article.published
            },
            select: {
                article_id: true,
                judul: true,
                photo_url: true,
                views: true,
                created_at: true,
            },
            orderBy: orderBy,
        });
        
        const formattedArticles = articles.map((article) => ({
            id: article.article_id,
            gambar: article.photo_url,
            judul: article.judul ?? "Tanpa Judul",
            seen: article.views ? Number(article.views) : 0,
            tanggal: article.created_at,
        }));
        
        return NextResponse.json(formattedArticles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
    }
}