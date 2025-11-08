import Link from "next/link";
import styles from "@/styles/sidebar-article.module.css";
import inter from "@/fonts/inter";

interface Props {
  ListCategory: string[];
}

export default function SidebarArticle({ ListCategory }: Props) {
  return (
    <div className={`${inter.variable} ${styles.container}`}>
      <h4>Tags</h4>
      <ul>
        {ListCategory.map((item, index) => (
          <li key={index}>
            <Link href="#">{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
