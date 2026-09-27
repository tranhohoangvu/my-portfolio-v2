"use client";

import { motion } from "motion/react";
import { useContent } from "@/lib/useContent";
import { useLang } from "@/lib/i18n";
import { SectionHeader } from "@/components/SectionHeader";
import { fadeUp, inView, stagger } from "@/lib/animations";
import { useCardFx } from "@/lib/cardFx";

/** 3 bản CV + ảnh xem trước, ghép từ c.profile.cvs */
const PREVIEW: Record<string, string> = {
  "TranHoHoangVu_BE.pdf": "/cv-be-preview.webp",
  "TranHoHoangVu_FE.pdf": "/cv-fe-preview.webp",
  "TranHoHoangVu_AI.pdf": "/cv-ai-preview.webp",
};

const DESC_KEY: Record<string, "sec.cv.beDesc" | "sec.cv.feDesc" | "sec.cv.aiDesc"> = {
  "TranHoHoangVu_BE.pdf": "sec.cv.beDesc",
  "TranHoHoangVu_FE.pdf": "sec.cv.feDesc",
  "TranHoHoangVu_AI.pdf": "sec.cv.aiDesc",
};

export function Cv() {
  const c = useContent();
  const { t } = useLang();
  const { onPointerMove } = useCardFx();

  return (
    <section id="cv" className="scroll-mt-20 md:scroll-mt-24" aria-label={t("sec.cv.aria")}>
      <div className="container-x">
        <SectionHeader
          index="02" section="cv"
          label="curriculum vitae"
          title={t("sec.cv.title")}
          lead={t("sec.cv.lead")}
        />

        <motion.ul
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid gap-5 md:grid-cols-3"
        >
          {c.profile.cvs.map((cv) => (
            <motion.li
              key={cv.file}
              variants={fadeUp}
              onPointerMove={onPointerMove}
              data-cursor="link"
              className="panel panel-hover rounded-card fx-card fx-clip group flex flex-col overflow-hidden"
            >
              <span aria-hidden className="fx-sheen" />

              {/* ảnh xem trước trang CV */}
              <div className="relative aspect-[1/1.414] overflow-hidden border-b border-line bg-void-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PREVIEW[cv.file]}
                  alt={t("sec.cv.previewAlt").replace("{0}", cv.label)}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-panel/90 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="mono-label text-cyan">{cv.note}</span>
                <h3 className="mt-2 text-lg font-semibold text-fg">{cv.label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-dim">
                  {t(DESC_KEY[cv.file])}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <a
                    href={`/${cv.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="rounded-card inline-flex items-center gap-1.5 bg-cyan px-3.5 py-2 font-mono text-xs font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
                  >
                     {t("sec.cv.download")}
                  </a>
                  <a
                    href={`/${cv.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="rounded-card inline-flex items-center gap-1.5 border border-line px-3.5 py-2 font-mono text-xs text-fg transition-colors hover:border-cyan hover:text-cyan"
                  >
                    {t("sec.cv.view")}
                  </a>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* kinh nghiệm thực tế */}
        <div className="mt-16">
          <p className="mono-label mb-5 text-cyan">{t("sec.cv.exp")}</p>
          <motion.ul
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="space-y-4"
          >
            {c.experience.map((job) => (
              <motion.li
                key={job.company}
                variants={fadeUp}
                onPointerMove={onPointerMove}
                data-cursor="link"
                className="panel rounded-card fx-card p-6"
              >
                <span aria-hidden className="fx-glow" />
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold text-fg">{job.company}</h3>
                  <span className="font-mono text-xs text-cyan">{job.period}</span>
                </div>
                <p className="mt-1 font-mono text-sm text-lime">
                  {job.role}
                  <span className="text-faint">  {job.place}</span>
                </p>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-dim md:text-base">
                  {job.body}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-sm border border-line px-2 py-0.5 font-mono text-[0.6875rem] text-faint"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}