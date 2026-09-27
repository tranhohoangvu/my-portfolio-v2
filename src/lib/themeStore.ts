"use client";

import { isThemeId, themeIds } from "@/data/themes";

const STORAGE_KEY = "portfolio-theme";
const FALLBACK = "cyberpunk";

type Listener = () => void;

/**
 * Store theme tối giản đọc/ghi localStorage.
 * Dùng useSyncExternalStore nên:
 *  - server render luôn ra `cyberpunk` (khớp HTML tĩnh),
 *  - client hydrate xong mới nâng lên theme đã lưu — không cần setState trong effect.
 */
let current: string | null = null;
const listeners = new Set<Listener>();

function read(): string {
  if (typeof window === "undefined") return FALLBACK;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isThemeId(stored) ? stored : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export const themeStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  /** dùng cho useSyncExternalStore — luôn trả string ổn định */
  getSnapshot(): string {
    if (current === null) current = read();
    return current;
  },

  /** giá trị lúc server render */
  getServerSnapshot(): string {
    return FALLBACK;
  },

  set(id: string) {
    if (!isThemeId(id) || id === current) return;
    current = id;
    document.documentElement.dataset.theme = id;
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* private mode — theme vẫn đổi trong phiên này */
    }
    listeners.forEach((listener) => listener());
  },

  next(): string {
    const index = themeIds.indexOf(themeStore.getSnapshot());
    const next = themeIds[(index + 1) % themeIds.length];
    themeStore.set(next);
    return next;
  },
};