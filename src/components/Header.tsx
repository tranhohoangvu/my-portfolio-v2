"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ease } from "@/lib/animations";
import { NAV_ITEMS, SECTION_IDS, localePath } from "@/lib/nav";
import { useActiveSection } from "@/lib/useActiveSection";
import { useBooted } from "@/lib/useBooted";
import { useLang } from "@/lib/i18n";
import { useContent } from "@/lib/useContent";

type Props = {
  /** trang con (`/work/[slug]`) không có preloader nên header hiện ngay */
  instant?: boolean;
};

export function Header({ instant = false }: Props) {
  const c = useContent();
  const pathname = usePathname();
  const isHome = pathname === "/vi" || pathname === "/en";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const booted = useBooted(instant);
  const { lang, setLang, t } = useLang();
  const active = useActiveSection(SECTION_IDS, isHome);

  /* Trên trang con, anchor phải quay về trang chủ trước rồi mới cuộn tới.
     Riêng "#top" không cần hash: về "/" là đã ở đầu trang, giữ hash lại lộ
     ra "/#top" trên thanh địa chỉ (giống cách Footer đang làm). */
  const navKey = (item: (typeof NAV_ITEMS)[number]) => `nav.${item.label}` as const;

  const href = (hash: string) =>
    isHome
      ? hash
      : hash === "#top"
        ? localePath(lang, "/")
        : localePath(lang, `/${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* khoá scroll khi mở menu mobile */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.6, ease }}
      className={`fixed inset-x-0 top-0 z-80 border-b transition-colors duration-500 ${
        scrolled
          ? "border-line bg-void/80 backdrop-blur-md"
          : "border-transparent"
      }`}
    >
      {/* 3 cột: trái / giữa / phải. Hai cột ngoài cùng kích thước (1fr) nên
          cột giữa luôn nằm đúng trục giữa, không bị đẩy lệch khi 2 bên
          không dài bằng nhau. */}
      <div className="container-x grid h-16 grid-cols-[1fr_auto] items-center gap-4 md:h-20 md:grid-cols-[1fr_auto_1fr]">
        {/* khối trái: logo + tên */}
        <div className="flex min-w-0 items-center">
          <a
            href={href("#top")}
            className="shrink-0 whitespace-nowrap font-mono text-sm text-fg transition-colors hover:text-cyan"
          >
            <span className="text-cyan">~</span> {c.profile.name}
          </a>
        </div>

        {/* desktop nav — cột tự co, luôn căn giữa */}
        <nav aria-label={t("hdr.nav")} className="hidden md:flex">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={href(item.href)}
                  className={`mono-label rounded-card px-3 py-2 transition-colors hover:text-cyan ${
                    active === item.href.slice(1) ? "text-cyan" : ""
                  }`}
                >
                  {t(navKey(item))}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* khối phải */}
        <div className="flex items-center justify-end gap-3">


          <button
            type="button"
            onClick={() => setLang(lang === "vi" ? "en" : "vi")}
            data-cursor="link"
            aria-label={lang === "vi" ? t("hdr.toEn") : t("hdr.toVi")}
            className="mono-label hidden cursor-pointer rounded-card border border-line px-2.5 py-2 text-dim transition-colors hover:border-cyan hover:text-cyan md:inline-flex"
          >
            {lang === "vi" ? "EN" : "VI"}
          </button>

          {/* nút menu mobile */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label={open ? t("hdr.menuClose") : t("hdr.menuOpen")}
            className="flex h-10 w-10 items-center justify-center md:hidden"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* menu mobile */}
      <AnimatePresence>
        {open ? (
          <motion.nav
            key="mobile-nav"
            aria-label={t("hdr.navMobile")}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden border-t border-line bg-void/95 backdrop-blur-md md:hidden"
          >
            <ul className="container-x flex flex-col py-2">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li
                    key={item.href}
                    className="border-b border-line/60 last:border-0"
                  >
                    <a
                      href={href(item.href)}
                      onClick={() => setOpen(false)}
                      className="group relative flex items-center gap-3 py-4 font-mono text-sm"
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="mobile-nav-active"
                          transition={{ duration: 0.35, ease }}
                          className="absolute -inset-x-3 inset-y-0 rounded-card border border-cyan/50 bg-cyan/5"
                        />
                      ) : null}
                      <span
                        aria-hidden
                        className={`relative transition-all duration-500 ${
                          isActive
                            ? "h-4 w-px bg-cyan"
                            : "h-px w-6 bg-line group-hover:w-9 group-hover:bg-dim"
                        }`}
                      />
                      <span
                        className={`relative ${
                          isActive ? "text-cyan" : "text-fg"
                        }`}
                      >
                        {t(navKey(item))}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}