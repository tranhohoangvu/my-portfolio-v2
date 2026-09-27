"use client";

import { useEffect, useState } from "react";
import { isBooted, markBooted } from "@/lib/boot";

/**
 * `true` khi app đã boot xong (preloader chạy xong, hoặc phiên này đã boot rồi).
 * `instant = true` dùng cho trang con (`/work/[slug]`): header hiện ngay, không
 * chờ preloader, và đánh dấu boot để về trang chủ không phải xem lại preloader.
 */
export function useBooted(instant = false) {
  const [booted, setBooted] = useState(instant);

  useEffect(() => {
    if (instant) {
      markBooted();
      return;
    }

    if (isBooted()) {
      // preloader không chạy lại trong phiên này → chờ nháy fade rồi hiện nav
      const id = window.setTimeout(() => setBooted(true), 300);
      return () => window.clearTimeout(id);
    }

    const onBooted = () => setBooted(true);
    const timer = window.setTimeout(onBooted, 2400);
    window.addEventListener("portfolio:booted", onBooted);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("portfolio:booted", onBooted);
    };
  }, [instant]);

  return booted;
}