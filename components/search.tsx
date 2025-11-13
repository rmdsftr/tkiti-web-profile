"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import styles from "@/styles/search.module.css";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    } else {
      params.delete('search');
    }
    
    // Reset ke halaman pertama saat search
    params.delete('page');
    
    router.push(`/articles?${params.toString()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Jika input kosong, hapus parameter search
    if (!value.trim()) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('search');
      router.push(`/articles?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.container}>
      <FaSearch color="#11AEAF" />
      <input
        type="text"
        placeholder="Cari artikel..."
        className={styles.input}
        value={searchQuery}
        onChange={handleInputChange}
      />
    </form>
  );
}