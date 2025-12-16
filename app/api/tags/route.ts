import { NextResponse } from 'next/server';
import { prisma } from "@/lib/db";
import { article_status_article } from '@prisma/client';

// Interface yang sesuai dengan tipe dari Prisma
interface TagFromDB {
    tag_id: bigint;
    tag: string;
    total_article: bigint | null;
}

export async function GET() {
    try {
        const tags = await prisma.tags.findMany({
            select: {
                tag_id: true,
                tag: true,
                total_article: true,
            },
            where: {
                article_tag: {
                    some: {
                        article: {
                            status_article: article_status_article.published
                        }
                    }
                }
            },
            orderBy: {
                total_article: 'desc',
            },
        });
 
        const formattedTags = tags.map((t: TagFromDB) => ({
            id: Number(t.tag_id), // Konversi bigint ke number
            name: t.tag,
            articleCount: Number(t.total_article || BigInt(0)) // Konversi bigint ke number
        }));

        return NextResponse.json({
            success: true,
            data: formattedTags
        });
    } catch (error) {
        console.error("Error fetching tags:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch tags" },
            { status: 500 }
        );
    }
}