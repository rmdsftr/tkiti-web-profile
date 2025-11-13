import { NextResponse } from 'next/server';
import { prisma } from "@/lib/db";

interface TagFromDB {
    tag_id: number;
    tag: string | null;
    total_article: number | null;
}

export async function GET() {
    try {
        const tags = await prisma.tags.findMany({
            select: {
                tag_id: true,
                tag: true,
                total_article: true,
            },
            orderBy: {
                total_article: 'desc',
            },
        });
 
        const formattedTags = tags
            .filter((t: TagFromDB) => t.tag !== null)
            .map((t: TagFromDB) => ({
                id: t.tag_id,
                name: t.tag,
                articleCount: t.total_article || 0
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