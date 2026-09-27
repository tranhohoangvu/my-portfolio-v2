
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ease } from "@/lib/animations";
import { useLang } from "@/lib/i18n";
import { useTheme } from "@/lib/useTheme";
import { ThemePanel } from "@/components/ThemePanel";

/**
 * Dock cố định góc phải dưới: pill mở popover chọn 10 theme (giữ phím `T`).
 * Dock không dùng transform ở node gốc để lớp `fixed` bên trong định vị
 * theo viewport, không bị ảnh hưởng bởi hiệu ứng hover của pill.
 */
export function ActionDock() {
  const { current } = useTheme();
  const { t } = useLang();
  const [themeOpen, setThemeOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  /* bấm ra ngoài dock thì đóng popover theme */
  useEffect(() => {
    if (!themeOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setThemeOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [themeOpen]);

  return (
    <div
      ref={rootRef}
      className="fixed right-4 bottom-4 z-70 flex flex-col items-end gap-3 md:right-6 md:bottom-6"
    >
      {/* pill chọn theme + popover danh sách 10 theme */}
      <div className="relative">
        <ThemePanel open={themeOpen} onClose={() => setThemeOpen(false)} />

        <motion.button
          type="button"
          onClick={() => setThemeOpen((prev) => !prev)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          aria-expanded={themeOpen}
          aria-haspopup="dialog"
          title={t("dock.theme.title")}
          className="panel rounded-card flex cursor-pointer items-center gap-2 px-3 py-2 font-mono text-[0.6875rem] transition-colors hover:text-cyan"
        >
          <span aria-hidden className="flex items-center -space-x-1">
            <span
              className="h-3 w-3 rounded-full border border-line"
              style={{ backgroundColor: current.preview.bg }}
            />
            <span
              className="h-3 w-3 rounded-full border border-line"
              style={{ backgroundColor: current.preview.accent }}
            />
            <span
              className="h-3 w-3 rounded-full border border-line"
              style={{ backgroundColor: current.preview.ink }}
            />
          </span>
          <span className="text-fg">{current.name}</span>
          <motion.span
            aria-hidden
            animate={{ rotate: themeOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease }}
            className="text-cyan"
          >
            ▼
          </motion.span>
          <span className="sr-only">
            {t("dock.theme.sr")} {current.name}
          </span>
        </motion.button>
      </div>
    </div>
  );
}