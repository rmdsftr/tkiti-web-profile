import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { repositori_jenis_repo } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get('filter') as repositori_jenis_repo | 'all' | null;

    // Build where clause based on filter
    const whereClause: any = {};
    if (filter && filter !== 'all') {
      whereClause.jenis_repo = filter;
    }

    const repositories = await prisma.repositori.findMany({
      where: whereClause,
      select: {
        repositori_id: true,
        judul_repo: true,
        deskripsi: true,
        photo_url: true,
        jenis_repo: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Fetch contributors and documentation for each repository
    const repositoriesWithDetails = await Promise.all(
      repositories.map(async (repo) => {
        // Get contributors
        const contributors = await prisma.kontributor.findMany({
          where: {
            repositori_id: repo.repositori_id,
          },
          include: {
            admin: {
              select: {
                nama: true,
                nim: true,
              },
            },
          },
        });

        // Get documentation links
        const documentation = await prisma.dokumentasi.findMany({
          where: {
            repositori_id: repo.repositori_id,
          },
          select: {
            link_id: true,
            link: true,
          },
        });

        return {
          id: repo.repositori_id,
          title: repo.judul_repo,
          description: repo.deskripsi || '',
          image: repo.photo_url || null,
          badge: {
            label: repo.jenis_repo === 'ilmiah' ? 'Publikasi' : 
                   repo.jenis_repo === 'prestasi' ? 'Prestasi' : 'Proyek',
            color: repo.jenis_repo === 'ilmiah' ? 'publikasi' : repo.jenis_repo,
          },
          contributors: contributors.map((c) => ({
            name: c.admin.nama,
            nim: c.admin.nim,
          })),
          documentationLinks: documentation.map((doc) => ({
            id: Number(doc.link_id),
            label: doc.link || '',
            url: doc.link || '',
          })),
          created_at: repo.created_at,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: repositoriesWithDetails,
    });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch repositories',
        data: [],
      },
      { status: 500 }
    );
  }
}