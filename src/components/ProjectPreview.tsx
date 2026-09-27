"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";
import { fadeUp, inView, stagger } from "@/lib/animations";

/**
 * "Ảnh chụp màn hình" dựng bằng CSS: khung cửa sổ trình duyệt + bố cục trang
 * giả lập, nền gradient theo màu nhấn của dự án nên hợp với cả 10 theme.
 */
export function ProjectPreview({ project }: { project: Project }) {
  const accent = { "--accent": project.accent } as CSSProperties;

  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="panel panel-hover rounded-card fx-clip overflow-hidden"
    >
      {/* thanh trình duyệt */}
      <div className="term-bar border-line flex items-center gap-3 px-4 py-3 font-mono text-xs text-faint">
        <span className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="truncate">{project.domain}</span>
        <span
          className={`ml-auto shrink-0 ${project.live ? "text-lime" : "text-amber"}`}
        >
          {project.live ? "live" : "demo"}
        </span>
      </div>

      {/* khung nội dung */}
      <motion.div
        variants={fadeUp}
        style={{
          ...accent,
          background:
            "linear-gradient(140deg, color-mix(in oklab, var(--accent) 32%, var(--color-void)), var(--color-void) 66%)",
        }}
        className="relative aspect-16/9 overflow-hidden"
      >
        {/* vệt sáng nổi + đường quét */}
        <span
          aria-hidden
          className="animate-pulse-glow absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--accent) 45%, transparent), transparent 70%)",
          }}
        />
        <span
          aria-hidden
          className="animate-pulse-glow absolute -right-20 -bottom-24 h-80 w-80 rounded-full blur-3xl"
          style={{
            animationDelay: "-1.5s",
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-cyan) 30%, transparent), transparent 70%)",
          }}
        />
        <span
          aria-hidden
          className="animate-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-cyan/10 to-transparent"
        />

        {/* bố cục trang giả lập */}
        <motion.div
          variants={stagger(0.09, 0.15)}
          className="animate-float absolute inset-x-6 inset-y-5 flex flex-col gap-3 sm:inset-x-10 sm:inset-y-7"
        >
          <div className="flex items-center gap-2">
            <motion.span
              variants={fadeUp}
              className="h-5 w-5 shrink-0 rounded-sm"
              style={{ background: "var(--accent)" }}
            />
            <span className="h-1.5 w-10 rounded-full bg-fg/25" />
            <span className="hidden h-1.5 w-16 rounded-full bg-fg/20 sm:block" />
            <span className="ml-auto h-5 w-16 rounded-full border border-fg/25" />
          </div>

          <motion.div
            variants={fadeUp}
            className="flex flex-1 flex-col justify-center gap-2.5"
          >
            <p className="font-mono text-[0.6rem] tracking-[0.2em] text-fg/50 uppercase sm:text-[0.65rem]">
              {project.type}
            </p>
            <p className="[font-family:var(--font-display)] text-2xl leading-tight text-fg sm:text-4xl">
              {project.name}
            </p>
            <div className="flex max-w-md flex-col gap-1.5">
              <span className="h-1.5 w-11/12 rounded-full bg-fg/20" />
              <span className="h-1.5 w-8/12 rounded-full bg-fg/15" />
            </div>
            <div className="mt-2 flex gap-2">
              <span
                className="h-6 w-24 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <span className="h-6 w-16 rounded-full border border-fg/25" />
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col gap-1.5 rounded-card border border-fg/10 p-2"
              >
                <span
                  className="h-8 w-full rounded-sm"
                  style={{
                    background: `color-mix(in oklab, var(--accent) ${
                      34 - i * 9
                    }%, transparent)`,
                  }}
                />
                <span className="h-1.5 w-3/4 rounded-full bg-fg/20" />
                <span className="h-1.5 w-1/2 rounded-full bg-fg/10" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}