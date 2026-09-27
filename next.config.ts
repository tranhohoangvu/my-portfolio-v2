import type { NextConfig } from "next";

/**
 * URL cong khai:
 *   /vi, /vi/work/[slug]   tieng Viet  (default)
 *   /en, /en/work/[slug]   tieng Anh
 *
 * `/` va `/work/[slug]` la duong dan CUU, chuyen huong 308 sang ban tieng
 * Viet de moi link da chia se, moi backlink va ca index cu hon deu den
 * dung noi dung. 308 (permanent) bao cho Google chuyen ma URL ma khong
 * ton mat diem lien ket.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/vi", permanent: true },
      { source: "/work/:slug", destination: "/vi/work/:slug", permanent: true },
    ];
  },
};

export default nextConfig;

