"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";
import { ProjectPreview } from "@/components/ProjectPreview";
import { SectionHeader } from "@/components/SectionHeader";
import { fadeUp, inView, stagger } from "@/lib/animations";
import { useCardFx } from "@/lib/cardFx";
import { useContent } from "@/lib/useContent";
import { useLang } from "@/lib/i18n";
import { localePath } from "@/lib/nav";

type Props = {
  project: Project;
  prev?: Project;
  next?: Project;
};

/** Nội dung trang /work/[slug] — toàn bộ chuyển động dùng Motion, màu theo theme */
export function ProjectDetail({ project, prev, next }: Props) {
  const { lang, t } = useLang();
  const c = useContent();
  const { onPointerMove } = useCardFx();

  /* server truyen ban tieng Viet -> tra ve ban da dich theo lang hien tai */
  const cur = c.projects.find((p) => p.slug === project.slug) ?? project;
  const prevP = prev ? (c.projects.find((p) => p.slug === prev.slug) ?? prev) : undefined;
  const nextP = next ? (c.projects.find((p) => p.slug === next.slug) ?? next) : undefined;

  /* ve danh sach du an: giu ngon ngu hien tai (`/en/work/x` -> `/en#work`) */
  const listHref = `${localePath(lang, "/")}#work`;

  return (
    <article className="container-x pt-28 pb-6 md:pt-36">
      {/* toan bo noi dung doc tu `cur` (ban da dich) thay vi `project` (ban server) */}
      {/* breadcrumb kiểu terminal */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-sm text-cyan"
      >
        <Link
          href={listHref}
          data-cursor="link"
          className="group inline-flex items-center gap-2"
        >
          <span
            className="transition-transform group-hover:-translate-x-1"
            aria-hidden
          >
            ←
          </span>
          {t("pd.back")}
        </Link>
      </motion.p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
        {/* cột trái: badge, tiêu đề, mô tả, CTA */}
        <motion.div variants={stagger(0.1)} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            <span className="rounded-full border border-line px-3 py-1 font-mono text-[0.6875rem] text-fg">
              {cur.type}
            </span>
            <span className="rounded-full border border-line px-3 py-1 font-mono text-[0.6875rem] text-fg">
              {cur.year}
            </span>
            <span className="rounded-full border border-line px-3 py-1 font-mono text-[0.6875rem] text-fg">
              {cur.role}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-5 text-5xl italic [font-family:var(--font-display)] md:text-7xl"
          >
            {cur.name}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-3 font-mono text-sm text-cyan md:text-base"
          >
            {cur.desc}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-relaxed text-dim md:text-lg"
          >
            {cur.summary}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {cur.url ? (
              <a
                href={cur.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="rounded-card group inline-flex items-center gap-2 bg-cyan px-5 py-3 font-mono text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
              >
                {t("pd.open")} {cur.domain}
                <span
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden
                >
                  ↗
                </span>
              </a>
            ) : (
              <span className="rounded-card border border-line px-5 py-3 font-mono text-sm text-dim">
                {t("pd.demo")}
              </span>
            )}

            <Link
              href={listHref}
              data-cursor="link"
              className="rounded-card inline-flex items-center gap-2 border border-line px-5 py-3 font-mono text-sm text-fg transition-colors hover:border-cyan hover:text-cyan"
            >
              {t("pd.backList")}
            </Link>
          </motion.div>
        </motion.div>

        {/* cột phải: panel stack.json */}
        <motion.aside
          variants={fadeUp}
          initial="hidden"
          animate="show"
          onPointerMove={onPointerMove}
          className="panel panel-hover rounded-card fx-card h-fit p-5"
        >
          <span aria-hidden className="fx-glow" />
          <p className="mono-label mb-4 text-cyan">{t("pd.stack")}</p>
          <motion.ul
            variants={stagger(0.06, 0.3)}
            className="space-y-2.5 font-mono text-sm"
          >
            {cur.tags.map((tag) => (
              <motion.li
                key={tag}
                variants={fadeUp}
                className="flex items-center gap-3 text-fg"
              >
                <span className="text-cyan" aria-hidden>
                  ▸
                </span>
                {tag}
              </motion.li>
            ))}
          </motion.ul>
          <p className="mt-5 border-t border-line pt-3 font-mono text-[0.6875rem] text-faint">
            {t("pd.techCount").replace("{0}", String(cur.tags.length))} · {cur.year}
          </p>
        </motion.aside>
      </div>
      {/* khung trình duyệt mô phỏng dự án */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="mt-12"
      >
        <ProjectPreview project={cur} />
      </motion.div>

      {/* 3 việc chính trong dự án */}
      <section className="mt-16">
        <SectionHeader
          index="01"
          label={t("pd.done.label")}
          title={t("pd.done.title")}
          lead={t("pd.done.lead")}
        />
        <motion.ol
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid gap-4 md:grid-cols-3"
        >
          {cur.highlights.map((item, i) => (
            <motion.li
              key={item}
              variants={fadeUp}
              onPointerMove={onPointerMove}
              className="panel panel-hover rounded-card fx-card p-5"
            >
              <span aria-hidden className="fx-glow" />
              <p className="mono-label mb-2 text-cyan">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="text-sm leading-relaxed text-dim">{item}</p>
            </motion.li>
          ))}
        </motion.ol>
      </section>

      {/* công nghệ đã dùng */}
      <section className="mt-16">
        <SectionHeader
          index="02"
          label={t("pd.tech.label")}
          title={t("pd.tech.title")}
          lead={t("pd.tech.lead")}
        />
        <motion.div
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="flex flex-wrap gap-2"
        >
          {cur.tags.map((tag) => (
            <motion.span
              key={tag}
              variants={fadeUp}
              className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-dim transition-colors hover:border-cyan hover:text-cyan"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* dự án liền trước / liền sau */}
      <nav className="mt-16 grid gap-4 sm:grid-cols-2" aria-label={t("pd.other")}>
        {prevP ? (
          <Link
            href={localePath(lang, `/work/${prevP.slug}`)}
            data-cursor="link"
            onPointerMove={onPointerMove}
            className="panel panel-hover rounded-card fx-card group p-5"
          >
            <span aria-hidden className="fx-glow" />
            <p className="mono-label mb-2">{t("pd.prev")}</p>
            <p className="text-lg transition-colors group-hover:text-cyan">
              {prevP.name}
            </p>
            <p className="mt-1 text-sm text-dim">{prevP.desc}</p>
          </Link>
        ) : (
          <span />
        )}

        {nextP ? (
          <Link
            href={localePath(lang, `/work/${nextP.slug}`)}
            data-cursor="link"
            onPointerMove={onPointerMove}
            className="panel panel-hover rounded-card fx-card group p-5 sm:text-right"
          >
            <span aria-hidden className="fx-glow" />
            <p className="mono-label mb-2">{t("pd.next")}</p>
            <p className="text-lg transition-colors group-hover:text-cyan">
              {nextP.name}
            </p>
            <p className="mt-1 text-sm text-dim">{nextP.desc}</p>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}