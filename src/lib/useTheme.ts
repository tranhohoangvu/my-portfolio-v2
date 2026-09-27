import { createContext, useContext } from "react";
import type { Theme } from "@/data/themes";

export type ThemeContextValue = {
  theme: string;
  setTheme: (id: string) => void;
  /** chuyển sang theme kế tiếp — dùng cho phím tắt `T` và nút pill góc phải */
  nextTheme: () => void;
  current: Theme;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme phải nằm trong <ThemeProvider>");
  }
  return ctx;
}