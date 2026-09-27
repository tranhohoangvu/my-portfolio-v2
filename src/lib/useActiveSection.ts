"use client";

import { useEffect, useState } from "react";

/**
 * Trả về id của section đang nằm giữa viewport (dùng chung cho Header và
 * SectionRail nên chỉ tạo 1 observer cho mỗi component, bù trừ rất nhẹ).
 * `enabled = false` (trang con) thì luôn trả chuỗi rỗng.
 */
export function useActiveSection(ids: string[], enabled = true) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled) return;

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return enabled ? active : "";
}