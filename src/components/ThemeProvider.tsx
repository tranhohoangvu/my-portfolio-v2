"use client";

import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { themes } from "@/data/themes";
import { themeStore } from "@/lib/themeStore";
import { ThemeContext, type ThemeContextValue } from "@/lib/useTheme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  );

  const setTheme = useCallback((id: string) => themeStore.set(id), []);
  const nextTheme = useCallback(() => themeStore.next(), []);

  /* phím tắt `T` — bỏ qua khi đang gõ trong ô nhập liệu */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "t" && event.key !== "T") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }
      event.preventDefault();
      nextTheme();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextTheme]);

  const current = useMemo(
    () => themes.find((t) => t.id === theme) ?? themes[0],
    [theme],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, nextTheme, current }),
    [theme, setTheme, nextTheme, current],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}