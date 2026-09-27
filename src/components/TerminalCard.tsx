"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useContent } from "@/lib/useContent";
import { ease } from "@/lib/animations";

const TYPE_SPEED = 45;
const HOLD_MS = 1600;

/** Terminal window hero: 3 nút đỏ/vàng/xanh + hiệu ứng gõ từng dòng */
export function TerminalCard() {
  const c = useContent();
  const [line, setLine] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      // hiện ngay dòng đầu, không gõ từng ký tự
      const id = requestAnimationFrame(() => setTyped(c.profile.terminal[0].out));
      return () => cancelAnimationFrame(id);
    }

    const current = c.profile.terminal[line].out;

    if (!deleting && typed === current) {
      const hold = window.setTimeout(() => setDeleting(true), HOLD_MS);
      return () => window.clearTimeout(hold);
    }

    if (deleting && typed === "") {
      const id = requestAnimationFrame(() => {
        setDeleting(false);
        setLine((prev) => (prev + 1) % c.profile.terminal.length);
      });
      return () => cancelAnimationFrame(id);
    }

    const step = deleting ? -1 : 1;
    const id = window.setTimeout(
      () => setTyped(current.slice(0, typed.length + step)),
      TYPE_SPEED,
    );
    return () => window.clearTimeout(id);
  }, [typed, deleting, line, c.profile.terminal]);

  const current = c.profile.terminal[line];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease }}
      className="panel rounded-card w-full max-w-md overflow-hidden"
    >
      {/* thanh tiêu đề terminal — 3 chấm, theme swiss đổi màu viền trên */}
      <div className="term-bar flex items-center gap-2 border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-2 truncate font-mono text-[0.6875rem] text-faint">
          {c.profile.terminalTitle}
        </span>
      </div>

      <div className="space-y-2 p-5 font-mono text-xs sm:text-[0.8125rem]">
        <p className="text-fg">
          <span className="text-cyan">$</span> {current.cmd}
        </p>
        <p className="min-h-5 text-dim" aria-live="polite">
          {typed}
          <span className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 animate-blink bg-cyan" />
        </p>
      </div>
    </motion.div>
  );
}