// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // --- Konfigurasi Images untuk Supabase Storage ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Mengizinkan semua subdomain Supabase (misalnya, [project_ref].supabase.co)
        hostname: 'pub-d52bdfbf3fab4b55acca6a742c86b129.r2.dev',
        port: '',
        // Membatasi path hanya pada public storage Supabase untuk keamanan
        pathname: '/**',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;