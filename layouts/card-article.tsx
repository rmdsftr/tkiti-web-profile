import Image from "next/image";
import { FaRegCalendarAlt, FaEye } from "react-icons/fa";  
import styles from "@/styles/card-article.module.css";

const formatDate = (date: Date | string): string => {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    
    if (isNaN(date.getTime())) {
        return 'Tanggal tidak valid';
    }
    
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};


interface Props{
    gambar: string | null; 
    judul: string;
    seen: number;
    tanggal: Date | string; 
}

export default function CardArticle({gambar, judul, seen, tanggal} : Props){   
    const imageSrc = gambar || '/assets/placeholder-article.jpeg'; 
    const formattedTanggal = formatDate(tanggal);
    
    return(
        <div className={styles.container}>
        <Image
        src={imageSrc}
        
        width={175} 
        height={110}
        alt={`Gambar untuk artikel: ${judul}`}
        className={styles.img}
        />
        <div className={styles.title}>
        <h3>{judul}</h3>
        <div className={styles.footer}>
        <div className={styles.align}>
        <FaRegCalendarAlt/>
        <p>{formattedTanggal}</p>
        </div>
        </div>
        </div>
        </div>
    );
}