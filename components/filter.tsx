"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "@/styles/filter.module.css";

export default function FilterDropdown() {
  const [selected, setSelected] = useState("Terbaru");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter} onClick={() => setIsOpen(!isOpen)}>
        <p>{selected}</p>
        <FaChevronDown
          color="#11AEAF"
          className={`${styles.icon} ${isOpen ? styles.rotate : ""}`}
        />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <p onClick={() => handleSelect("Terbaru")}>Terbaru</p>
          <p onClick={() => handleSelect("Terpopuler")}>Terpopuler</p>
        </div>
      )}
    </div>
  );
}
