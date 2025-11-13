"use client";

import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "@/styles/filter.module.css";
import { useRouter, useSearchParams } from 'next/navigation'; 

export default function FilterDropdown() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentFilter = searchParams.get('filter'); 
    
    const [selected, setSelected] = useState(
        currentFilter === 'popular' ? 'Terpopuler' : 'Terbaru'
    );
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        setSelected(currentFilter === 'popular' ? 'Terpopuler' : 'Terbaru');
    }, [currentFilter]);
    
    const handleSelect = (option: 'latest' | 'popular') => {
        setIsOpen(false);
        
        const params = new URLSearchParams(searchParams.toString());
        
        params.set('filter', option);
        
        const newUrl = `/articles?${params.toString()}`;
        router.push(newUrl);
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
            <p onClick={() => handleSelect("latest")}>Terbaru</p>
            <p onClick={() => handleSelect("popular")}>Terpopuler</p>
            </div>
        )}
        </div>
    );
}