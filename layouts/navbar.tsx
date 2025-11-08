"use client";

import Image from "next/image"
import logo from "@/assets/logo.png";
import Link from "next/link";
import styles from "@/styles/navbar.module.css";
import inter from "@/fonts/inter";
import { usePathname } from "next/navigation";

export function NavbarLayout() {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <Image
        src={logo}
        width={25}
        height={25}
        alt="logo tkiti"
      />
      <Link
        href="/"
        className={`${styles.menu} ${pathname === "/" ? styles.active : ""} ${inter.variable}`}
      >
        About
      </Link>
      <Link
        href="/articles"
        className={`${styles.menu} ${pathname === "/articles" ? styles.active : ""} ${inter.variable}`}
      >
        Articles
      </Link>
      <Link
        href="/free-hosting"
        className={`${styles.menu} ${pathname === "" ? styles.active : ""} ${inter.variable}`}
      >
        Free Hosting
      </Link>
    </div>
  );
}
