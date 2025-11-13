import { FaArrowLeft } from "react-icons/fa";
import styles from "@/styles/floating-back.module.css";
import { useRouter } from "next/navigation";

export default function FloatingBackButton() {
    const router = useRouter();

    return (
        <div 
            className={styles.container} 
            onClick={() => router.push("/articles")}
        >
            <FaArrowLeft color="#11AEAF" />
        </div>
    );
}
