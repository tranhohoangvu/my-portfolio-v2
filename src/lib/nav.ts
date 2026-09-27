/** Danh sách section dùng chung cho Header, SectionRail và bảng lệnh.
 *  `label` cung cap khoa i18n `nav.<label>` — phai khop chinh xac voi dict,
 *  nen khong suy tu `href` (href la "#work" nhung key la "nav.projects"). */
export const NAV_ITEMS = [
  { label: "about", href: "#about" },
  { label: "cv", href: "#cv" },
  { label: "projects", href: "#work" },
  { label: "skills", href: "#stack" },
  { label: "certs", href: "#certs" },
  { label: "github", href: "#github" },
  { label: "console", href: "#console" },
  { label: "contact", href: "#contact" },
] as const;

/** id của các section (bỏ dấu `#`) để quan sát bằng IntersectionObserver */
export const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

/**
 * Hai ngon ngu phuc vu theo duong dan URL (dynamic segment `[lang]`):
 *   /vi, /vi/work/schoolops   tieng Viet (default)
 *   /en, /en/work/schoolops   tieng Anh
 *
 * Server render dung ngon ngu theo segment nen metadata (title, description,
 * og:locale) luon khop voi noi dung nguoi doc dang thay. `/` va `/work/x`
 * la duong dan cu, duoc chuyen huong 308 sang `/vi` trong next.config.ts.
 */
export const LANGS = ["vi", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

/** tien to duong dan cua mot ngon ngu */
export const langPrefix = (lang: Lang) => `/${lang}`;

/**
 * Ghep duong dan noi bo voi tien to ngon ngu.
 * `path` bat dau bang "/" (vi du "/work/schoolops") hoac "#about".
 */
export function localePath(lang: Lang, path: string): string {
  if (path.startsWith("#")) return path; // hash: giu nguyen, SectionLinkScroll lo phan cuoi
  const body = path === "/" ? "" : path;
  return `${langPrefix(lang)}${body}`;
}

/** suy ra ngon ngu tu pathname hien tai (client side) */
export function langFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "vi";
}

/** duong dan doi ngon ngu, giu nguyen hash/query */
export function switchLangPath(pathname: string, to: Lang): string {
  const from = langFromPath(pathname);
  /* bo tien to cu cua URL hien tai de ghep lai, tranh /en/en/... */
  const rest = from === "en" ? pathname.slice("/en".length) : pathname.replace(/^\/vi/, "");
  return localePath(to, rest || "/");
}
