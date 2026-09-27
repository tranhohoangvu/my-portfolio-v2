"use client";

import { motion } from "motion/react";
import { useContent } from "@/lib/useContent";
import { useLang } from "@/lib/i18n";
import { SectionHeader } from "@/components/SectionHeader";
import { fadeUp, inView, stagger } from "@/lib/animations";
import { useCardFx } from "@/lib/cardFx";

export function About() {
  const c = useContent();
  const { t } = useLang();
  const { onPointerMove } = useCardFx();

  return (
    <section id="about" className="scroll-mt-24" aria-label={t("sec.about.aria")}>
      <div className="container-x">
        <SectionHeader index="01" section="about" label="about" title={t("sec.about.title")} />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          {/* cột trái: 3 đoạn + 4 card giá trị */}
          <div>
            <motion.div
              variants={stagger(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="space-y-5"
            >
              {c.profile.about.paragraphs.map((text, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="text-base leading-relaxed text-dim first:text-fg md:text-lg"
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            <motion.ol
              variants={stagger(0.1, 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="mt-10 grid gap-4 sm:grid-cols-2"
            >
              {c.profile.about.values.map((value, i) => (
                <motion.li
                  key={value.title}
                  variants={fadeUp}
                  onPointerMove={onPointerMove}
                  className="panel panel-hover rounded-card fx-card group p-5"
                >
                  <span aria-hidden className="fx-glow" />
                  <p className="mono-label mb-2 text-cyan">
                    {String(i + 1).padStart(2, "0")} — {value.title}
                  </p>
                  <p className="text-sm leading-relaxed text-dim">{value.body}</p>
                </motion.li>
              ))}
            </motion.ol>
          </div>

          {/* cột phải: panel c.profile.json + education + học bổng */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-4"
          >
            <div className="panel rounded-card p-5">
              <p className="mono-label mb-4 text-cyan">c.profile.json</p>
              <dl className="space-y-2 font-mono text-xs">
                {c.profile.profileJson.map(([key, val]) => (
                  <div key={key} className="flex items-start gap-3">
                    <dt className="w-20 shrink-0 text-faint">
                      {`"${key}"`}
                    </dt>
                    <dd className="min-w-0 flex-1 break-words text-fg">
                      {`"${val}"`}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="panel rounded-card p-5">
              <p className="mono-label mb-3 text-cyan">education</p>
              <p className="text-sm text-fg">{c.profile.education.school}</p>
              <p className="mt-1 font-mono text-xs text-dim">
                {c.profile.education.major}
              </p>
              <p className="mt-4 mb-2 font-mono text-[0.6875rem] text-faint">
                {t("edu.courses")}
              </p>
              <ul className="space-y-1.5">
                {c.profile.education.courses.map((course) => (
                  <li
                    key={course}
                    className="flex items-start gap-2 font-mono text-xs text-dim"
                  >
                    <span className="text-cyan" aria-hidden>
                      ›
                    </span>
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel rounded-card p-5">
              <p className="mono-label mb-3 text-cyan">{t("edu.awards")}</p>
              <ul className="space-y-3">
                {c.profile.education.awards.map((award) => (
                  <li
                    key={award.title}
                    className="flex items-baseline justify-between gap-3"
                  >
                    <span className="text-sm text-fg">{award.title}</span>
                    <span className="shrink-0 font-mono text-xs text-lime">
                      {award.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}