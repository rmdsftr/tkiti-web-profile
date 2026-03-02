import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get("limit");

    try {
        const kegiatan = await prisma.kegiatan.findMany({
            select: {
                kegiatan_id: true,
                judul: true,
                deskripsi: true,
                photo_url: true,
                created_at: true,
            },
            orderBy: {
                created_at: "desc",
            },
            ...(limitParam ? { take: parseInt(limitParam) } : {}),
        });

        const formatted = kegiatan.map((item) => ({
            id: item.kegiatan_id,
            judul: item.judul ?? "Tanpa Judul",
            deskripsi: item.deskripsi ?? "",
            photo_url: item.photo_url,
            created_at: item.created_at,
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("Error fetching kegiatan:", error);
        return NextResponse.json(
            { error: "Failed to fetch kegiatan" },
            { status: 500 }
        );
    }
}
