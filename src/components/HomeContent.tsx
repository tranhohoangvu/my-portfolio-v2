import { LangText } from "@/components/LangText";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { ActionDock } from "@/components/ActionDock";
import { SectionRail } from "@/components/SectionRail";
import { SectionLinkScroll } from "@/components/SectionLinkScroll";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Cv } from "@/components/sections/Cv";
import { Work } from "@/components/sections/Work";
import { Stack } from "@/components/sections/Stack";
import { Certificates } from "@/components/sections/Certificates";
import { GitHub } from "@/components/sections/GitHub";
import { Console } from "@/components/sections/Console";
import { Contact } from "@/components/sections/Contact";

/**
 * Noi dung trang chu, dung chung cho (vi) va (en).
 * Moi section doc noi dung qua `useContent()` nen tu lay dung ngon ngu
 * tu provider — file nay khong can biet la dang o ban nao.
 */
export function HomeContent() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-card focus:bg-cyan focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-on-accent"
      >
        <SkipToContent />
      </a>

      <Preloader />
      <SectionLinkScroll />
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <SectionRail />

      <main id="main" className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Cv />
        <Work />
        <Stack />
        <Certificates />
        <GitHub />
        <Console />
        <Contact />
      </main>

      <Footer />
      <ActionDock />
    </>
  );
}

/** nhan skip-to-content, doc qua client component de lay san key `t()` */
function SkipToContent() {
  return <LangText k="a11y.skip" />;
}
