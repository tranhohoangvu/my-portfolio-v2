"use client";

import { useContent } from "@/lib/useContent";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Counter } from "@/components/Counter";
import { TerminalCard } from "@/components/TerminalCard";
import { HeroCanvas } from "@/components/HeroCanvas";
import { fadeUp, stagger } from "@/lib/animations";
import { useLang } from "@/lib/i18n";

export function Hero() {
  const c = useContent();
  const { t } = useLang();
  const [cvOpen, setCvOpen] = useState(false);
  const cvBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cvOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!cvBox.current?.contains(e.target as Node)) setCvOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCvOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [cvOpen]);
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
      aria-label={t("hero.aria")}
    >
      {/* nền: lưới kỹ thuật + 2 vệt sáng + canvas hạt + scanline */}
      <div className="tech-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        className="animate-pulse-glow pointer-events-none absolute -top-32 -left-24 -z-10 h-105 w-105 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-cyan) 26%, transparent), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="animate-pulse-glow pointer-events-none absolute -right-32 -bottom-40 -z-10 h-105 w-105 rounded-full blur-3xl"
        style={{
          animationDelay: "-1.5s",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-violet) 22%, transparent), transparent 70%)",
        }}
        aria-hidden
      />
      <HeroCanvas />
      <div
        className="animate-scan pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-transparent via-cyan/5 to-transparent"
        aria-hidden
      />

      <div className="container-x">
        <motion.div
          variants={stagger(0.12, 0.1)}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-10"
        >
          {/* cột trái */}
          <div className="min-w-0">
            <motion.p
              variants={fadeUp}
              className="mono-label mb-6 inline-flex items-center gap-2 text-lime"
            >
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
              {c.profile.contact.status}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-display leading-[0.9] tracking-tight"
            >
              <span className="block text-fg">{c.profile.headline[0]}</span>
              <span className="text-stroke block">{c.profile.headline[1]}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-relaxed text-dim sm:text-lg"
            >
              {c.profile.intro}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                data-cursor="link"
                className="rounded-card group inline-flex items-center gap-2 bg-cyan px-5 py-3 font-mono text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
              >
                {t("hero.cta.projects")}
                <span
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </a>
              <div ref={cvBox} className="relative">
                <button
                  type="button"
                  onClick={() => setCvOpen((v) => !v)}
                  aria-expanded={cvOpen}
                  aria-haspopup="menu"
                  data-cursor="link"
                  className="rounded-card inline-flex items-center gap-2 border border-line px-5 py-3 font-mono text-sm text-fg transition-colors hover:border-cyan hover:text-cyan"
                >
                   {t("hero.cta.cv")}
                  <span
                    aria-hidden
                    className={cvOpen ? "rotate-180 transition-transform" : "transition-transform"}
                  >
                    
                  </span>
                </button>

                <AnimatePresence>
                  {cvOpen ? (
                    <motion.div
                      key="cv-menu"
                      role="menu"
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 z-50 mt-2 w-72 origin-top-left overflow-hidden rounded-card border border-line bg-panel shadow-xl"
                    >
                      <p className="mono-label border-b border-line px-3 py-2 text-faint">
                        {t("hero.cv.pick")}
                      </p>
                      {c.profile.cvs.map((cv) => (
                        <a
                          key={cv.file}
                          href={`/${cv.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          role="menuitem"
                          data-cursor="link"
                          onClick={() => setCvOpen(false)}
                          className="flex items-center justify-between gap-3 border-b border-line/60 px-3 py-2.5 text-left transition-colors last:border-b-0 hover:bg-cyan/10"
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-sm text-fg">
                              {cv.label}
                            </span>
                            <span className="mono-label block text-faint">
                              {cv.note}
                            </span>
                          </span>
                          <span aria-hidden className="shrink-0 text-cyan">
                            
                          </span>
                        </a>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* 4 counter */}
            <motion.dl
              variants={stagger(0.08)}
              className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4"
            >
              {c.profile.stats.map((stat) => (
                <motion.div key={stat.label} variants={fadeUp}>
                  <dd className="font-mono text-2xl text-cyan sm:text-3xl">
                    <Counter value={stat.value} decimals={stat.decimals} />
                  </dd>
                  <dt className="mono-label mt-1">{stat.label}</dt>
                </motion.div>
              ))}
            </motion.dl>
          </div>

          {/* cột phải — terminal */}
          <motion.div variants={fadeUp} className="flex justify-end">
            <TerminalCard />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="scroll-cue mt-16 flex items-center gap-2 pb-2"
        >
          <span className="animate-blink" aria-hidden>
            ↓
          </span>
          {c.profile.scrollCue}
        </motion.p>
      </div>
    </section>
  );
}
