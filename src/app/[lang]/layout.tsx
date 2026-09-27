import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { homeMetadata, personJsonLd } from "@/lib/seo";
import { RootShell } from "@/components/layout/RootShell";
import { isLang, LANGS } from "@/lib/nav";
import "../globals.css";

export const viewport = {
  themeColor: "#05070a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** Dung san 2 trang tinh /vi va /en — khong can render dong */
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return homeMetadata(lang);
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <RootShell lang={lang} initialLang={lang} jsonLd={personJsonLd()}>
      {children}
    </RootShell>
  );
}
