import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { article_status_article } from "@prisma/client";

export async function GET() {
    try {
        
        const [totalArticles, totalTags, viewsResult] = await Promise.all([   
            
            prisma.article.count({
                where: {
                    status_article: article_status_article.published
                }
            }),    
            
            
            prisma.tags.count({
                where: {
                    article_tag: {
                        some: {
                            article: {
                                status_article: article_status_article.published
                            }
                        }
                    }
                }
            }),     
            
            
            prisma.article.aggregate({
                _sum: {
                    views: true,
                },
                where: {
                    status_article: article_status_article.published
                }
            }),
        ]);

        // Konversi bigint ke number untuk serialisasi JSON
        const totalViews = viewsResult._sum.views 
            ? Number(viewsResult._sum.views) 
            : 0;

        return NextResponse.json({
            success: true,
            data: {
                totalArticles,
                totalTags,
                totalViews,
            },
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch statistics",
                data: {
                    totalArticles: 0,
                    totalTags: 0,
                    totalViews: 0,
                },
            },
            { status: 500 }
        );
    }
}