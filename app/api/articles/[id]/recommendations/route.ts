import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const limit = 8; 

    const currentArticle = await prisma.article.findUnique({
      where: { article_id: id },
      include: {
        article_tag: {
          select: {
            tag_id: true,
          },
        },
      },
    });

    if (!currentArticle) {
      return NextResponse.json(
        { error: 'Artikel tidak ditemukan' },
        { status: 404 }
      );
    }

    const currentTagIds = currentArticle.article_tag.map((at: { tag_id: number }) => at.tag_id);

    
    const recommendations = await prisma.article.findMany({
      where: {
        article_id: {
          not: id,
        },
        article_tag: {
          some: {
            tag_id: {
              in: currentTagIds,
            },
          },
        },
      },
      include: {
        article_tag: {
          include: {
            tags: true,
          },
        },
      },
      orderBy: [
        { created_at: 'desc' },
      ],
      take: limit,
    });

    
    if (recommendations.length < limit) {
      const additionalArticles = await prisma.article.findMany({
        where: {
          article_id: {
            notIn: [id, ...recommendations.map((a: { article_id: string }) => a.article_id)],
          },
        },
        orderBy: {
          created_at: 'desc',
        },
        take: limit - recommendations.length,
      });

      recommendations.push(...additionalArticles);
    }

    
    const formattedRecommendations = recommendations.map((article: {
      article_id: string;
      judul: string | null;
      photo_url: string | null;
      created_at: Date;
    }) => ({
      article_id: article.article_id,
      judul: article.judul,
      photo_url: article.photo_url,
      created_at: article.created_at,
    }));

    return NextResponse.json(formattedRecommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil rekomendasi artikel' },
      { status: 500 }
    );
  }
}