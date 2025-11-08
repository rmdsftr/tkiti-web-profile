import { NavbarLayout } from "@/layouts/navbar";
import FilterDropdown from "@/components/filter";
import Search from "@/components/search";
import SidebarArticle from "@/layouts/sidebar-article";
import HeroArticles from "@/components/hero-articles";
import styles from "@/styles/articles-layout.module.css";

const categoryDummy = [
  "Semua",
  "Machine Learning",
  "Enterprise Systems",
  "Cybersecurity",
  "Quantum Computing",
  "Electromagnetics",
  "Plasma Simulation",
  "Information Governance",
  "Data Analytics",
  "AI Ethics",
  "Smart City",
  "Human–AI Collaboration",
  "Healthcare Informatics",
  "Robotics",
  "High-Performance Computing",
  "Software Engineering",
];

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarLayout />
      <div className={styles.container}>
        <HeroArticles />
        
        <main className={styles.main}>
          <div className={styles.sidebar}>
            <SidebarArticle ListCategory={categoryDummy} />
          </div>
          
          <div className={styles.contentWrapper}>
            <div className={styles.controls}>
              <FilterDropdown />
              <Search />
            </div>
            
            <div className={styles.content}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}