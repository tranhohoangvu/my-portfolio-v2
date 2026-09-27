"use client";

import Link from "next/link";
import { LangText } from "@/components/LangText";
import { useLang } from "@/lib/i18n";
import { localePath } from "@/lib/nav";

/**
 * 404 dung chung cho ca `/vi` va `/en`.
 *
 * Client component de doc `lang` tu `LanguageProvider`: duong dan `/en/xxx`
 * sai thi lien he "Ve trang chu" phai tro ve `/en`, khong phai `/vi` (dung
 * context nen server render ra cung dung ngon ngu cua URL hien tai).
 */
export default function NotFound() {
  const { lang } = useLang();
  const home = localePath(lang, "/");

  return (
    <main className="container-x flex min-h-svh flex-col items-center justify-center py-24 text-center">
      <p className="mono-label mb-4 text-cyan">
        {"// 404 — not found"}
      </p>
      <h1 className="text-display leading-none">Oops</h1>
      <p className="mt-4 max-w-md text-dim">
        <LangText k="nf.body" />
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={home}
          data-cursor="link"
          className="rounded-card bg-cyan px-5 py-3 font-mono text-sm text-on-accent"
        >
          <LangText k="nf.home" />
        </Link>
        <Link
          href={`${home}#work`}
          data-cursor="link"
          className="rounded-card border border-line px-5 py-3 font-mono text-sm text-fg transition-colors hover:border-cyan hover:text-cyan"
        >
          <LangText k="nf.work" />
        </Link>
      </div>
    </main>
  );
}
