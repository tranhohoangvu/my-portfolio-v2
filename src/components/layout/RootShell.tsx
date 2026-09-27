import type { ReactNode } from "react";
import { FONT_CLASS } from "@/lib/fonts";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n";
import type { Lang } from "@/lib/nav";

/** Icon công nghệ (skills section) — cùng CDN với portfolio cũ */
const DEVICON_CSS = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css";

/**
 * Script chong nhay mau (FOUC): gan theme tu localStorage truoc khi CSS
 * cua trinh duyet ve. Doc trong <head> nen chay ngay, khong doi vai tro
 * cua React.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("portfolio-theme")||"cyberpunk";document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="cyberpunk";}})();`;

/**
 * Khung `<html>/<head>/<body>` dung chung cho ca hai ngon ngu.
 * Khac biet duy nhat giua `/vi` va `/en` la `lang`/`initialLang` — phan
 * hinh anh goc giu nguyen de doi chieu.
 *
 * App Router tu sinh `<head>` tu `metadata` cua layout; day la `<head>`
 * thu cong chi de them preconnect + stylesheet CDN + JSON-LD, thu tu phai
 * dung de script anti-FOUC chay truoc khi CSS duoc ve.
 */
export function RootShell({
  lang,
  initialLang,
  jsonLd,
  children,
}: {
  lang: Lang;
  initialLang: Lang;
  jsonLd: object;
  children: ReactNode;
}) {
  return (
    <html lang={lang} className={FONT_CLASS} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- xem ghi chu tren */}
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link rel="stylesheet" href={DEVICON_CSS} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LanguageProvider initialLang={initialLang}>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
