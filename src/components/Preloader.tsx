"use client";

import { useContent } from "@/lib/useContent";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ease } from "@/lib/animations";
import { isBooted, markBooted } from "@/lib/boot";

const TOTAL_MS = 2000;

export function Preloader() {
  const c = useContent();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let done = false;
    try {
      done = isBooted();
    } catch {
      done = false;
    }
    if (done) {
      // đã boot ở phiên trước → bỏ qua preloader (defer 1 frame cho khỏi setState
      // đồng bộ trong effect)
      const id = requestAnimationFrame(() => {
        setVisible(false);
        setProgress(100);
      });
      return () => cancelAnimationFrame(id);
    }

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / TOTAL_MS, 1);
      // easeOutQuart cho thanh chạy nhanh ở đầu rồi chậm dần
      setProgress(Math.round((1 - Math.pow(1 - p, 4)) * 100));
      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setVisible(false);
        markBooted();
      }
    };

    if (reduce) {
      const id = requestAnimationFrame(() => {
        setProgress(100);
        setVisible(false);
        markBooted();
      });
      return () => cancelAnimationFrame(id);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const shown = c.profile.preloader.slice(
    0,
    Math.max(1, Math.ceil((progress / 100) * c.profile.preloader.length)),
  );

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          data-preloader
          className="fixed inset-0 z-100 flex flex-col justify-center bg-void px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease }}
          aria-hidden
        >
          <div className="mx-auto w-full max-w-md font-mono text-xs text-dim">
            {shown.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="mb-1.5 flex items-center gap-2"
              >
                <span className="text-cyan">›</span>
                <span className="truncate">{line}</span>
                <span className="text-lime">done</span>
              </motion.p>
            ))}
          </div>

          <div className="mx-auto mt-6 w-full max-w-md">
            <div className="h-px w-full overflow-hidden bg-line">
              <motion.div
                className="h-full bg-cyan"
                style={{ scaleX: progress / 100 }}
              />
            </div>
            <p className="mt-2 text-right font-mono text-[0.6875rem] text-faint">
              {progress} %
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}