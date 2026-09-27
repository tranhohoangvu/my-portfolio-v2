"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useContent } from "@/lib/useContent";
import { useLang } from "@/lib/i18n";
import { localePath } from "@/lib/nav";
import { workStats, type Project } from "@/data/projects";
import { ease, fadeUp, inView, stagger } from "@/lib/animations";
import { useCardFx } from "@/lib/cardFx";
/** Một card dự án: đèn spotlight theo chuột, vệt sáng quét, nổi lên khi hover */
function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useLang();
  const { onPointerMove } = useCardFx();

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease }}
      onPointerMove={onPointerMove}
      className="panel panel-hover rounded-card fx-card fx-clip group p-5 md:p-6"
    >
      <span aria-hidden className="fx-glow" />
      <span aria-hidden className="fx-sheen" />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-mono text-xs text-cyan">{project.domain}</span>
        {project.live ? (
          <span className="flex items-center gap-1.5 font-mono text-[0.6875rem] text-lime">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
            live
          </span>
        ) : null}
        <span className="font-mono text-[0.6875rem] text-amber">
          {project.badge ?? project.type}
        </span>
        <span className="ml-auto font-mono text-xs text-faint">
          {project.year}
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="min-w-0">
          <h3 className="text-xl transition-colors group-hover:text-cyan md:text-2xl">
            {/* bấm tiêu đề cũng mở trang chi tiết */}
            <Link href={localePath(lang, `/work/${project.slug}`)} data-cursor="link">
              {project.name}
            </Link>
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-dim">
            {project.desc}
          </p>
        </div>
        <p className="shrink-0 font-mono text-xs text-faint">{project.role}</p>
      </div>

      {/* dải tag + 2 nút: trên mobile tách 2 hàng để nút không bị "lún" theo
          số tag (7–10 tag, có tag dài như "Row Level Security (RLS)"),
          từ `sm` mới xếp chung hàng và đẩy nút về mép phải. */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6875rem] text-dim transition-colors group-hover:border-cyan/40"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* vùng chạm 44px trên mobile (ngón tay), thu gọn lại từ `sm` cho gọn */}
        <div className="flex items-center gap-3 sm:ml-auto">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("sec.work.open").replace("{0}", project.name)}
              data-cursor="link"
              className="inline-flex min-h-11 items-center rounded-sm border border-line px-3 font-mono text-[0.6875rem] text-dim transition-colors hover:border-cyan hover:text-cyan sm:min-h-0 sm:px-2 sm:py-1"
            >
              ↗ Github
            </a>
          ) : null}

          <Link
            href={localePath(lang, `/work/${project.slug}`)}
            data-cursor="link"
            className="inline-flex min-h-11 items-center gap-1.5 font-mono text-xs text-cyan sm:min-h-0"
          >
            {t("sec.work.detail")}
            <span
              className="transition-transform group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function Work() {
  const c = useContent();
  const { t } = useLang();
  return (
    <section id="work" className="scroll-mt-20 md:scroll-mt-24" aria-label={t("sec.work.aria")}>
      <div className="container-x">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-label mb-3 flex items-center gap-2 text-cyan">
              <span>{`// 03`}</span>
              <span className="text-faint">work</span>
            </p>
            <h2 className="text-headline">{t("sec.work.title")}</h2>
          </div>
          <p className="font-mono text-sm text-dim md:text-right">
            {t("sec.work.count")
              .replace("{0}", String(workStats.live))
              .replace("{1}", String(workStats.total))}
          </p>
        </div>

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="flex flex-col gap-4"
        >
          {c.projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}