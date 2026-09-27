"use client";

import { useEffect, useRef, useState } from "react";

type CursorVariant = "link" | "text" | null;

/** Cạnh khung vây (px) cho từng trạng thái */
const FRAME = { idle: 26, link: 46, text: 112 } as const;

/**
 * Con trỏ dạng khuôn vây: 4 góc vuông bám theo con trỏ + 1 chấm ở tâm.
 * Mọi màu lấy từ token `--color-cyan` nên tự đổi theo theme đang chọn.
 * Chỉ bật khi chuột thật (hover + pointer: fine), ẩn hoàn toàn trên touch.
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>(null);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    // defer 1 frame: tránh setState đồng bộ trong effect
    const enableId = requestAnimationFrame(() => setEnabled(true));
    document.documentElement.classList.add("has-custom-cursor");

    // gốc có kích thước 0x0 nên chỉ cần dời đúng điểm chuột, phần canh
    // tâm do translate của các phần tử con đảm nhiệm.
    const onMove = (event: PointerEvent) => {
      if (rootRef.current) {
        rootRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
      setVisible(true);
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor]",
      );
      setVariant((target?.dataset.cursor as CursorVariant) ?? null);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(enableId);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  if (!enabled) return null;

  const size = variant === "link" ? FRAME.link : variant === "text" ? FRAME.text : FRAME.idle;

  // nét góc đậm hơn khi bám lên link, mờ khi rảnh
  const corner = `absolute h-1.5 w-1.5 border-cyan transition-opacity duration-300 ${
    variant ? "opacity-100" : "opacity-60"
  }`;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-100">
      <div
        ref={rootRef}
        className={`absolute top-0 left-0 h-0 w-0 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* khung vây co giãn theo trạng thái hover */}
        <div
          className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-[width,height,transform] duration-300 ease-out ${
            pressed ? "scale-90" : "scale-100"
          }`}
          style={{ width: size, height: size }}
        >
          <span className={`${corner} top-0 left-0 border-t border-l`} />
          <span className={`${corner} top-0 right-0 border-t border-r`} />
          <span className={`${corner} bottom-0 left-0 border-b border-l`} />
          <span className={`${corner} right-0 bottom-0 border-r border-b`} />
        </div>

        {/* chấm tâm — ẩn khi bám lên vùng chữ để không lẫn với thanh ngang */}
        <span
          className={`absolute top-0 left-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan transition-opacity duration-200 ${
            variant === "text" ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
}