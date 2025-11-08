import Image, { StaticImageData } from "next/image";
import { FaRegCalendarAlt, FaEye } from "react-icons/fa";  
import styles from "@/styles/card-article.module.css";

interface Props{
    gambar: StaticImageData;
    judul: string;
    seen: number;
    tanggal: string;
}

export default function CardArticle({gambar, judul, seen, tanggal} : Props){
    return(
        <div className={styles.container}>
            <Image
                src={gambar}
                width={175}
                height={50}
                alt=""
                className={styles.img}
            />
            <div className={styles.title}>
                <h3>{judul}</h3>
                <div className={styles.footer}>
                    <div className={styles.align}>
                        <FaEye/>
                        <p>{seen} kali</p>
                    </div>
                    <div className={styles.align}>
                        <FaRegCalendarAlt/>
                        <p>{tanggal}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}