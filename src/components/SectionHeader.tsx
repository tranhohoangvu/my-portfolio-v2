"use client";

import { motion } from "motion/react";
import { ease, fadeUp, growLine, inView, stagger } from "@/lib/animations";
import { useLang } from "@/lib/i18n";

type SectionKey =
  | "about"
  | "cv"
  | "work"
  | "stack"
  | "certs"
  | "github"
  | "console"
  | "contact";

type Props = {
  /** so thu tu: "01", "02"... */
  index: string;
  /** nhan ngan canh so, vi du "about" */
  label: string;
  title: string;
  /** mo ta ngan dat ben phai (tuy chon) */
  lead?: string;
  /** khoa section trong dict i18n  uu tien ca label/title/lead khi co */
  section?: SectionKey;
};

export function SectionHeader({ index, label, title, lead, section }: Props) {
  const { t } = useLang();

  const l = section ? t(`sec.${section}.label` as const) : label;
  const ti = section ? t(`sec.${section}.title` as const) : title;
  const le = section ? t(`sec.${section}.lead` as const) : lead;

  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="mb-10 md:mb-14"
    >
      {/* nhan `// 0X label` + duong ke noi dai (scaleX khi vao khung) */}
      <motion.div
        variants={growLine}
        className="mb-5 flex items-center gap-4"
        aria-hidden
      >
        <span className="mono-label shrink-0 whitespace-nowrap text-cyan">
          {`// ${index} ${l}`}
        </span>
        <span className="h-px w-full origin-left bg-line" />
      </motion.div>

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.7, ease }}
          className="text-headline"
        >
          {ti}
        </motion.h2>

        {le ? (
          <motion.p
            variants={fadeUp}
            className="max-w-md shrink-0 text-sm leading-relaxed text-dim md:text-right"
          >
            {le}
          </motion.p>
        ) : null}
      </div>
    </motion.div>
  );
}