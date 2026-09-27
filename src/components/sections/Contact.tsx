"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useContent } from "@/lib/useContent";
import { useLang } from "@/lib/i18n";
import { SectionHeader } from "@/components/SectionHeader";
import { fadeUp, inView, stagger } from "@/lib/animations";
import { useCardFx } from "@/lib/cardFx";
import { ContactForm } from "@/components/Forms";

export function Contact() {
  const c = useContent();
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const { onPointerMove } = useCardFx();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(c.profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* trình duyệt chặn clipboard — bỏ qua */
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 md:scroll-mt-24" aria-label={t("sec.contact.aria")}>
      <div className="container-x">
        <SectionHeader
          index="08" section="contact"
          label="contact"
          title={t("sec.contact.title")}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          onPointerMove={onPointerMove}
          className="panel rounded-card fx-card p-6 md:p-10"
        >
          <span aria-hidden className="fx-glow" />
          <p className="max-w-2xl text-lg leading-relaxed text-fg md:text-xl">
            {c.profile.contact.blurb}
          </p>

          <motion.div
            variants={stagger(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
          >
            {/* CTA lớn */}
            <div className="flex flex-col justify-between gap-6">
              <div>
                <p className="mono-label mb-2 flex items-center gap-2 text-lime">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
                  status: {c.profile.contact.status}
                </p>
                <a
                  href={`mailto:${c.profile.email}`}
                  data-cursor="link"
                  className="rounded-card group inline-flex max-w-full items-center gap-3 bg-cyan px-5 py-4 font-mono text-sm text-on-accent transition-transform hover:-translate-y-0.5 md:text-base"
                >
                  <span className="truncate">{t("sec.contact.email")}</span>
                  <span
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </a>
              </div>

              <a
                href={c.profile.cvHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="rounded-card inline-flex w-fit items-center gap-2 border border-line px-5 py-3 font-mono text-sm text-fg transition-colors hover:border-cyan hover:text-cyan"
              >
                {t("sec.contact.cvDownload")}
              </a>
            </div>

            {/* panel contact.sh */}
            <div className="rounded-card border border-line">
              <p className="term-bar border-line px-4 py-2.5 font-mono text-xs text-cyan">
                contact.sh
              </p>
              <dl className="space-y-3 p-5 font-mono text-xs sm:text-sm">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <dt className="w-14 shrink-0 text-faint">email</dt>
                  <dd className="flex min-w-0 flex-1 items-center gap-2">
                    <a
                      href={`mailto:${c.profile.email}`}
                      data-cursor="link"
                      className="truncate text-fg transition-colors hover:text-cyan"
                    >
                      {c.profile.email}
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      data-cursor="link"
                      aria-label={t("sec.contact.copyBtn")}
                      className="shrink-0 cursor-pointer rounded-sm border border-line px-2 py-0.5 text-[0.6875rem] text-dim transition-colors hover:border-cyan hover:text-cyan"
                    >
                      {copied ? t("sec.contact.copied") : t("sec.contact.copyShort")}
                    </button>
                  </dd>
                </div>
                {c.profile.phone ? (
                  <div className="flex items-center gap-x-3">
                    <dt className="w-14 shrink-0 text-faint">phone</dt>
                    <dd>
                      <a
                        href={`tel:+${c.profile.phone.replace(/\s/g, "")}`}
                        data-cursor="link"
                        className="text-fg transition-colors hover:text-cyan"
                      >
                        {c.profile.phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
                <div className="flex items-center gap-x-3">
                  <dt className="w-14 shrink-0 text-faint">github</dt>
                  <dd>
                    <a
                      href={`https://${c.profile.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="text-fg transition-colors hover:text-cyan"
                    >
                      {c.profile.github}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-x-3">
                  <dt className="w-14 shrink-0 text-faint">linkedin</dt>
                  <dd>
                    <a
                      href={`https://${c.profile.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="text-fg transition-colors hover:text-cyan"
                    >
                      in/{c.profile.slug}
                    </a>
                  </dd>
                </div>

                <div className="flex items-start gap-x-3">
                  <dt className="w-14 shrink-0 pt-0.5 text-faint">social</dt>
                  <dd className="flex min-w-0 flex-1 flex-wrap gap-1.5">
                    {[
                      ["youtube", c.profile.youtube],
                      ["instagram", c.profile.instagram],
                      ["facebook", c.profile.facebook],
                    ].map(([label, handle]) => (
                      <a
                        key={label}
                        href={`https://${handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="link"
                        className="rounded-card border border-line px-2.5 py-1 font-mono text-xs text-fg transition-colors hover:border-cyan hover:text-cyan"
                      >
                        {label}
                      </a>
                    ))}
                  </dd>
                </div>
                <div className="flex items-start gap-x-3">
                  <dt className="w-14 shrink-0 pt-0.5 text-faint">based</dt>
                  <dd className="text-fg">
                    {c.profile.location}
                    <span className="mt-0.5 block font-mono text-[0.6875rem] text-faint">
                      {c.profile.workMode}
                    </span>
                  </dd>
                </div>
                <div className="flex items-start gap-x-3">
                  <dt className="w-14 shrink-0 pt-0.5 text-faint">edu</dt>
                  <dd className="text-fg">
                    {c.profile.education.school}
                    <span className="mt-0.5 block font-mono text-[0.6875rem] text-faint">
                      {c.profile.education.major} · GPA {c.profile.gpa}
                    </span>
                  </dd>
                </div>
                <div className="flex items-start gap-x-3">
                  <dt className="w-14 shrink-0 pt-0.5 text-faint">cv</dt>
                  <dd className="min-w-0 flex-1">
                    <ul className="space-y-1.5">
                      {c.profile.cvs.map((cv) => (
                        <li key={cv.file}>
                          <a
                            href={`/${cv.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="link"
                            className="inline-flex max-w-full items-center gap-2 text-fg transition-colors hover:text-cyan"
                          >
                            <span className="truncate">↓ {cv.label}</span>
                            <span className="shrink-0 font-mono text-[0.6875rem] text-faint">
                              {cv.note}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </motion.div>

        <ContactForm />
      </div>
    </section>
  );
}
