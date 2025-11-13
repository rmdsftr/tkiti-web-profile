// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // --- Konfigurasi Images untuk Supabase Storage ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Mengizinkan semua subdomain Supabase (misalnya, [project_ref].supabase.co)
        hostname: '*.supabase.co', 
        port: '',
        // Membatasi path hanya pada public storage Supabase untuk keamanan
        pathname: '/storage/v1/object/public/**', 
      },
    ],
  },
  /* config options here */
};

export default nextConfig;