"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { themes } from "@/data/themes";
import { ease } from "@/lib/animations";
import { useLang } from "@/lib/i18n";
import { useTheme } from "@/lib/useTheme";

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * Popover "PHONG CÁCH THIẾT KẾ": bấm pill ở góc phải để chọn trong 10 theme.
 * Bấm vào theme sẽ áp dụng ngay (giữ panel mở để so sánh), nút `T` chuyển nhanh
 * theme kế tiếp, Esc đóng, ↑ ↓ chuyển giữa các theme.
 */
export function ThemePanel({ open, onClose }: Props) {
  const { theme, setTheme, nextTheme } = useTheme();
  const { t } = useLang();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

      const list = listRef.current;
      if (!list) return;
      const options = Array.from(
        list.querySelectorAll<HTMLButtonElement>("[data-theme-option]"),
      );
      const current = options.findIndex((el) => el === document.activeElement);
      const step = event.key === "ArrowDown" ? 1 : -1;
      event.preventDefault();
      options[(current + step + options.length) % options.length]?.focus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="theme-panel"
          role="dialog"
          aria-label={t("theme.title")}
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.96 }}
          transition={{ duration: 0.28, ease }}
          className="panel rounded-card absolute right-0 bottom-[calc(100%+0.75rem)] w-[min(20rem,calc(100vw-2rem))] p-3"
        >
          <div className="mb-2 flex items-center justify-between gap-3 px-1.5 pt-1">
            <p className="mono-label">{t("theme.kicker")}</p>
            <button
              type="button"
              onClick={nextTheme}
              title={t("theme.hint")}
              className="mono-label cursor-pointer rounded-sm border border-line px-1.5 py-0.5 text-cyan transition-colors hover:border-cyan"
            >
              T
            </button>
          </div>

          <div
            ref={listRef}
            role="radiogroup"
            aria-label={t("theme.list")}
            className="hide-scrollbar max-h-[min(60vh,25rem)] space-y-0.5 overflow-y-auto"
          >
            {themes.map((item) => {
              const active = theme === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  tabIndex={active ? 0 : -1}
                  data-theme-option={item.id}
                  onClick={() => setTheme(item.id)}
                  data-cursor="link"
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-card px-2.5 py-2 text-left transition-colors ${
                    active
                      ? "bg-cyan/10 text-cyan"
                      : "hover:bg-fg/5 hover:text-fg"
                  }`}
                >
                  {/* 3 chấm màu lấy từ data */}
                  <span
                    aria-hidden
                    className="flex shrink-0 items-center -space-x-1.5"
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-line"
                      style={{ backgroundColor: item.preview.bg }}
                    />
                    <span
                      className="h-4 w-4 rounded-full border border-line"
                      style={{ backgroundColor: item.preview.accent }}
                    />
                    <span
                      className="h-4 w-4 rounded-full border border-line"
                      style={{ backgroundColor: item.preview.ink }}
                    />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{item.name}</span>
                    <span className="block truncate text-xs text-dim">
                      {item.desc}
                    </span>
                  </span>

                  {active ? (
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* gợi ý phím tắt — command palette đã bỏ nên chỉ còn phím `T` */}
          <p className="mono-label mt-2 flex items-center gap-2 border-t border-line px-1.5 pt-2">
            <kbd className="rounded-sm border border-line px-1 text-cyan">T</kbd>
            <span className="text-faint">·</span>
            <span className="text-faint">{t("theme.hint")}</span>
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}