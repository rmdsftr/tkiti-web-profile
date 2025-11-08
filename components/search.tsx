import { FaSearch } from "react-icons/fa";
import styles from "@/styles/search.module.css";

export default function Search() {
  return (
    <div className={styles.container}>
      <FaSearch color="#11AEAF" />
      <input
        type="text"
        placeholder="Cari artikel..."
        className={styles.input}
      />
    </div>
  );
}
