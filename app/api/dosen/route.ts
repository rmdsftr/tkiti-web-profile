import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const dosenList = await prisma.dosen.findMany({
            select: {
                nip: true,
                nama_dosen: true,
                foto: true,
                posisi: true,
            },
            orderBy: {
                posisi: "asc", // "anggota" comes after "kepala" alphabetically — fine for grouping on client
            },
        });

        const kepala = dosenList
            .filter((d) => d.posisi === "kepala")
            .map((d) => ({
                nip: d.nip,
                nama_dosen: d.nama_dosen,
                foto: d.foto,
                posisi: d.posisi,
            }));

        const anggota = dosenList
            .filter((d) => d.posisi === "anggota")
            .map((d) => ({
                nip: d.nip,
                nama_dosen: d.nama_dosen,
                foto: d.foto,
                posisi: d.posisi,
            }));

        return NextResponse.json({ kepala, anggota });
    } catch (error) {
        console.error("Error fetching dosen:", error);
        return NextResponse.json(
            { error: "Failed to fetch dosen" },
            { status: 500 }
        );
    }
}
