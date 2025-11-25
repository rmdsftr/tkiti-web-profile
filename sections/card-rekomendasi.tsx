import Image, { StaticImageData } from "next/image";
import styles from "@/styles/card-rekomendasi.module.css";
import inter from "@/fonts/inter";

interface Props {
    gambar: StaticImageData | string;
    judul: string;
    tanggal: string;
}

export default function CardRekomendasi({ gambar, judul, tanggal }: Props) {
    return (
        <div className={`${inter.variable} ${styles.container}`}>
            <Image
                src={gambar}
                width={50}
                height={50}
                alt={judul}
                className={styles.img}
            />
            <div className={styles.title}>
                <h3>{judul}</h3>
                <p>{tanggal}</p>
            </div>
        </div>
    );
}