import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const article = await prisma.article.findUnique({
      where: {
        article_id: id,
      },
      include: {
        admin: {
          select: {
            nama: true,
            nim: true,
          },
        },
        article_tag: {
          include: {
            tags: {
              select: {
                tag_id: true,
                tag: true,
              },
            },
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Artikel tidak ditemukan' },
        { status: 404 }
      );
    }

    
    const formattedArticle = {
      article_id: article.article_id,
      judul: article.judul,
      photo_url: article.photo_url,
      content: article.content,
      views: article.views || 0,
      created_at: article.created_at,
      updated_at: article.updated_at,
      penulis: article.admin?.nama || 'Unknown',
      nim: article.nim,
      tags: article.article_tag.map((at: { tags: { tag_id: number; tag: string | null } }) => ({
        tag_id: at.tags.tag_id,
        tag: at.tags.tag,
      })),
    };

    return NextResponse.json(formattedArticle);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil artikel' },
      { status: 500 }
    );
  }
}