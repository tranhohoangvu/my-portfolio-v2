import type { Metadata } from "next";
import { CONTENT_EN } from "@/data/content.en";
import { getProject, projects } from "@/data/projects";
import { localePath, type Lang } from "@/lib/nav";

/**
 * TODO: đổi sang domain thật khi deploy.
 * Site cũ (static) nằm ở https://tranhohoangvu.github.io/my-portfolio/ —
 * dự án này là Next.js nên sẽ khác, sửa lại ở đây là đủ.
 */
export const SITE_URL = "https://tranhohoangvu.vercel.app";

const NAME = "Trần Hồ Hoàng Vũ";
const NAME_ASCII = "Tran Ho Hoang Vu";
const ROLE_VI = "Backend · Frontend · AI Engineer";
const ROLE_EN = "Backend · Frontend · AI Engineer";

/** og:locale / html lang phai dung dinh dang cua chuan, khong phai "vi_VN" */
const OG_LOCALE: Record<Lang, string> = { vi: "vi_VN", en: "en_US" };

/** ban tieng Anh dung dang khong dau de OG/SEO doc de khi share link */
const displayName = (lang: Lang) => (lang === "en" ? NAME_ASCII : NAME);

const TITLE: Record<Lang, string> = {
  vi: `${NAME} — ${ROLE_VI}`,
  en: `${NAME_ASCII} — ${ROLE_EN}`,
};

const DESC: Record<Lang, string> = {
  vi: "Trần Hồ Hoàng Vũ — Backend · Frontend · AI Engineer. Portfolio 10 dự án thật: Next.js, Node.js, Laravel, Python/PyTorch, PostgreSQL.",
  en: "Tran Ho Hoang Vu — Backend · Frontend · AI Engineer. Portfolio of 10 real projects: Next.js, Node.js, Laravel, Python/PyTorch, PostgreSQL.",
};

const KEYWORDS: Record<Lang, string[]> = {
  vi: [
    "backend developer",
    "frontend developer",
    "AI engineer",
    "next.js",
    "node.js",
    "laravel",
    "python",
    "pytorch",
    "Trần Hồ Hoàng Vũ",
  ],
  en: [
    "backend developer",
    "frontend developer",
    "AI engineer",
    "next.js",
    "node.js",
    "laravel",
    "python",
    "pytorch",
    "Tran Ho Hoang Vu",
  ],
};

/** mo ta dung cho mot du an, lay theo ngon ngu dang xem */
function projectDesc(slug: string, lang: Lang): string {
  if (lang === "en") {
    const t = CONTENT_EN.projects[slug as keyof typeof CONTENT_EN.projects];
    if (t) return t.summary;
  }
  return getProject(slug)?.summary ?? "";
}

/** JSON-LD Person, dung chung cho ca hai ngon ngu */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: NAME,
    alternateName: "Hoàng Vũ",
    jobTitle: ROLE_VI,
    email: "hoangvu2k4cmg@gmail.com",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "TP. Hồ Chí Minh",
      addressCountry: "VN",
    },
    sameAs: [
      "https://github.com/tranhohoangvu",
      "https://linkedin.com/in/tranhohoangvu",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Đại học Tôn Đức Thắng",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "Laravel",
      "Python",
      "PyTorch",
      "PostgreSQL",
    ],
  };
}

/** JSON-LD CreativeWork cho tung du an */
export function projectJsonLd(slug: string, lang: Lang) {
  const p = getProject(slug);
  if (!p) return null;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    description: projectDesc(slug, lang),
    url: `${SITE_URL}${localePath(lang, `/work/${p.slug}`)}`,
    ...(p.url ? { sameAs: p.url } : {}),
    keywords: p.tags.join(", "),
    creator: { "@type": "Person", name: displayName(lang), url: SITE_URL },
  };
}

/**
 * Metadata trang chu. `alternates.languages` tro sang hai ban de Google
 * hieu day la hai phien ban cua mot trang, khong phai hai trang rieng.
 */
export function homeMetadata(lang: Lang): Metadata {
  const url = localePath(lang, "/") || "/";
  return {
    title: TITLE[lang],
    description: DESC[lang],
    keywords: KEYWORDS[lang],
    authors: [{ name: displayName(lang) }],
    creator: displayName(lang),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        vi: `${SITE_URL}/vi`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/vi`,
      },
    },
    openGraph: {
      title: TITLE[lang],
      description: DESC[lang],
      url,
      siteName: displayName(lang),
      locale: OG_LOCALE[lang],
      alternateLocale: lang === "vi" ? "en_US" : "vi_VN",
      type: "website",
      images: [{ url: "/images/portrait.webp", width: 900, height: 900 }],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE[lang],
      description: DESC[lang],
      images: ["/images/portrait.webp"],
    },
    robots: { index: true, follow: true },
  };
}

/** Metadata trang chi tiết du an */
export function projectMetadata(slug: string, lang: Lang): Metadata {
  const p = getProject(slug);
  const url = localePath(lang, `/work/${slug}`);

  if (!p) {
    return {
      title: lang === "en" ? "Project not found" : "Không tìm thấy dự án",
      robots: { index: false, follow: false },
    };
  }

  const title = `${p.name} — ${displayName(lang)}`;
  const description = projectDesc(slug, lang);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        vi: `${SITE_URL}/vi/work/${slug}`,
        en: `${SITE_URL}/en/work/${slug}`,
        "x-default": `${SITE_URL}/vi/work/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: displayName(lang),
      locale: OG_LOCALE[lang],
      alternateLocale: lang === "vi" ? "en_US" : "vi_VN",
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** danh sach slug dung cho generateStaticParams cua nhom (en) */
export const ALL_SLUGS = projects.map((p) => p.slug);
export { NAME, NAME_ASCII };
