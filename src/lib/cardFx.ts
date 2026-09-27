"use client";

import { useCallback, type PointerEvent } from "react";

/**
 * Đèn spotlight đuổi theo con trỏ cho card `.fx-card`.
 * Ghi vị trí chuột vào biến CSS `--fx-x/--fx-y`; lớp `.fx-glow` bên trong card
 * dựng radial-gradient theo đúng vị trí đó (không cần re-render React).
 * Bỏ qua touch/pen để hiệu ứng không bị "dính" trên máy cảm ứng.
 */
export function useCardFx() {
  const onPointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--fx-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--fx-y", `${event.clientY - rect.top}px`);
  }, []);

  return { onPointerMove };
}