import styles from "@/styles/hero-articles.module.css";
import inter from "@/fonts/inter";

export default function HeroArticles() {
  return (
    <div className={`${styles.container} ${inter.variable}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>Articles & Insights</h1>
        <p className={styles.description}>
          Jelajahi artikel-artikel menarik dan berita terbaru bareng asisten lab Tata Kelola dan Infrastruktur Teknologi Informasi. Bakalan banyak nambah pengetahuan loh 😎
        </p>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>15+</span>
            <span className={styles.statLabel}>Artikel</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>16+</span>
            <span className={styles.statLabel}>Kategori</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>10K+</span>
            <span className={styles.statLabel}>Pembaca</span>
          </div>
        </div>
      </div>
      <div className={styles.decoration}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>
    </div>
  );
}