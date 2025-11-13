import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const article = await prisma.article.update({
      where: {
        article_id: id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      select: {
        article_id: true,
        views: true,
      },
    });

    return NextResponse.json({
      success: true,
      article_id: article.article_id,
      views: article.views,
    });
  } catch (error) {
    console.error('Error updating views:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate views' },
      { status: 500 }
    );
  }
}