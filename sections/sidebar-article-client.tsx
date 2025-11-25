"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/styles/sidebar-article.module.css";
import inter from "@/fonts/inter";

interface Props {
    ListCategory: string[];
}

export default function SidebarArticleClient({ ListCategory }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentTag = searchParams.get('tag') || 'Semua';
    const currentFilter = searchParams.get('filter') || 'latest';
    
    const [activeCategory, setActiveCategory] = useState(currentTag);
    
    useEffect(() => {
        setActiveCategory(currentTag);
    }, [currentTag]);
    
    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        
        const params = new URLSearchParams(searchParams.toString());
             
        if (category === 'Semua') {
            params.delete('tag');
        } else {
            params.set('tag', category);
        }
               
        if (currentFilter !== 'latest') {
            params.set('filter', currentFilter);
        }
        
        const newUrl = `/articles?${params.toString()}`;
        router.push(newUrl);
    };
    
    return (
        <div className={`${inter.variable} ${styles.container}`}>
            <h4>Tags</h4>
            <ul>
                {ListCategory.map((item, index) => (
                    <li 
                        key={index}
                        className={activeCategory === item ? styles.active : ''}
                    >
                        <a 
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick(item);
                            }}
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}