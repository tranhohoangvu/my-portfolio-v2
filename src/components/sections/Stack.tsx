"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useContent } from "@/lib/useContent";
import { useLang } from "@/lib/i18n";
import { localePath } from "@/lib/nav";
import { stack } from "@/data/stack";
import { SectionHeader } from "@/components/SectionHeader";
import { fadeUp, inView, stagger } from "@/lib/animations";
import { useCardFx } from "@/lib/cardFx";

/**
 * 4 tru cot ky nang (22). Moi ky nang hien bang **icon devicon** + ten,
 * kem badge "N du an" neu cong nghe do da dung trong du an that 
 * khong dung thanh tien do % (khong co du lieu co so de do).
 * Bam vao mot icon se liet ke cac du an tuong ung.
 */
export function Stack() {
  const c = useContent();
  const { lang, t } = useLang();
  const { onPointerMove } = useCardFx();
  /** skill dang duoc chon  bam de xem du an tuong ung */
  const [picked, setPicked] = useState<string | null>(null);

  /* loc du an bang slug cua chinh skill do (nguon skills.json) 
     khong khop bang ten tag nen khong bao gio bi lech. */
  const related = (slugs: string[]) =>
    c.projects.filter((p) => slugs.includes(p.slug));

  const pickedSkill = stack
    .flatMap((g) => g.items)
    .find((x) => x.id === picked);
  const pickedList = pickedSkill ? related(pickedSkill.slugs) : [];

  return (
    <section id="stack" className="scroll-mt-24" aria-label={t("sec.stack.aria")}>
      <div className="container-x">
        <SectionHeader
          index="04"
          section="stack"
          label="tech stack"
          title={t("sec.stack.title")}
          lead={t("sec.stack.lead")}
        />

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid gap-5 md:grid-cols-2"
        >
          {c.stack.map((group) => (
            <motion.article
              key={group.id}
              variants={fadeUp}
              onPointerMove={onPointerMove}
              data-cursor="link"
              className="panel panel-hover rounded-card fx-card fx-clip group p-5 md:p-6"
            >
              <span aria-hidden className="fx-sheen" />

              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card border border-line bg-cyan/10">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan"
                    aria-hidden
                  >
                    <path d={group.icon} />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="mono-label text-faint">{group.file}</p>
                  <h3 className="mt-0.5 text-lg font-semibold text-fg">
                    {group.label}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-dim">
                    {group.meta}
                  </p>
                </div>
              </div>

              <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3">
                {group.items.map((skill) => (
                  <button
                    type="button"
                    key={skill.id}
                    aria-pressed={picked === skill.id}
                    onClick={() =>
                      setPicked((v) => (v === skill.id ? null : skill.id))
                    }
                    title={
                      skill.slugs.length > 0
                        ? t("sec.stack.skillTitle")
                            .replace("{0}", skill.name)
                            .replace("{1}", String(skill.slugs.length))
                        : skill.name
                    }
                    className={`relative flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-card border px-2 py-3 transition-colors ${
                      picked === skill.id
                        ? "border-cyan bg-cyan/10"
                        : "border-line hover:border-cyan/60"
                    }`}
                  >
                    {skill.slugs.length > 0 ? (
                      <span className="mono-label absolute -top-1.5 -right-1.5 rounded-full border border-cyan/50 bg-void px-1.5 py-0.5 text-cyan">
                        {skill.slugs.length}
                      </span>
                    ) : null}

                    <i className={`${skill.icon} text-2xl`} aria-hidden />
                    <span className="text-center font-mono text-[0.6875rem] leading-tight text-dim">
                      {skill.name}
                    </span>
                    {skill.note ? (
                      <span className="text-center text-[0.625rem] leading-tight text-faint">
                        {skill.note}
                      </span>
                    ) : null}
                  </button>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>

        {/* du an tuong ung voi skill da chon */}
        {picked ? (
          <motion.div
            key={picked}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="panel rounded-card mt-5 p-5 md:p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="mono-label text-cyan">
                {t("sec.stack.using").replace("{0}", pickedSkill?.name ?? "")}
              </p>
              <button
                type="button"
                onClick={() => setPicked(null)}
                data-cursor="link"
                className="mono-label cursor-pointer text-faint transition-colors hover:text-cyan"
              >
                {t("sec.stack.close")}
              </button>
            </div>

            {pickedList.length === 0 ? (
              <p className="mt-3 text-sm text-dim">{t("sec.stack.empty")}</p>
            ) : (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {pickedList.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={localePath(lang, `/work/${p.slug}`)}
                      data-cursor="link"
                      className="flex items-center justify-between gap-3 rounded-card border border-line px-3 py-2.5 transition-colors hover:border-cyan hover:bg-cyan/5"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm text-fg">
                          {p.name}
                        </span>
                        <span className="mono-label block text-faint">
                          {p.type}  {p.year}
                        </span>
                      </span>
                      <span aria-hidden className="shrink-0 text-cyan">
                        
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}