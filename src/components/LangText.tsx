"use client";

import { useLang } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n";

/**
 * Render mot chuoi da bien dich o server component.
 * `LangText` la client component nen doc duoc context, nhung noi dung
 * server render ra van dung ngon ngu cua URL hien tai (initialLang).
 */
export function LangText({ k }: { k: DictKey }) {
  const { t } = useLang();
  return <>{t(k)}</>;
}
