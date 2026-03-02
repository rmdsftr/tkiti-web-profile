import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        // Try to find the active periode first, fall back to the latest one
        let periode = await prisma.periode.findFirst({
            where: { status_periode: "aktif" },
        });

        if (!periode) {
            periode = await prisma.periode.findFirst({
                orderBy: { nama_periode: "desc" },
            });
        }

        if (!periode) {
            return NextResponse.json({
                periode: null,
                inti: [],
                litbang: [],
                rtk: [],
                pengpel: [],
            });
        }

        const pengurusList = await prisma.pengurus.findMany({
            where: { periode_id: periode.periode_id },
            include: {
                admin: {
                    select: {
                        nim: true,
                        nama: true,
                        photo_url: true,
                    },
                },
            },
        });

        const groupByDivisi = (divisi: string) =>
            pengurusList
                .filter((p) => p.divisi === divisi)
                .map((p) => ({
                    nim: p.nim,
                    nama: p.admin.nama,
                    photo_url: p.admin.photo_url ?? null,
                    jabatan: p.jabatan,
                    divisi: p.divisi,
                }));

        return NextResponse.json({
            periode: {
                id: periode.periode_id,
                nama: periode.nama_periode,
            },
            inti: groupByDivisi("inti"),
            litbang: groupByDivisi("litbang"),
            rtk: groupByDivisi("rtk"),
            pengpel: groupByDivisi("pengpel"),
        });
    } catch (error) {
        console.error("Error fetching struktur:", error);
        return NextResponse.json(
            { error: "Failed to fetch struktur" },
            { status: 500 }
        );
    }
}
