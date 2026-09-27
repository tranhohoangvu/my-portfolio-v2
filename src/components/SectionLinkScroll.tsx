"use client";

import { useEffect } from "react";

/**
 * Ẩn hash khỏi URL khi bấm link section nội bộ (`#about`…).
 *
 * Gắn một listener ở `document` thay vì rải `onClick` ở từng link: link do
 * server render (skip-link trong `page.tsx`) cũng được xử lý, không sót chỗ nào.
 * Hash vẫn nằm trong `href` nên SEO và "mở tab mới" vẫn hoạt động bình thường.
 */
export function SectionLinkScroll() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // đã bị handler khác prevent rồi, hoặc không phải chuột trái
      if (event.defaultPrevented || event.button !== 0) return;
      // giữ nguyên hành vi mặc định khi người dùng mở tab mới
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!link) return;

      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      // chỉ xử lý hash có thật trong trang; selector lỗi thì bỏ qua
      let target: HTMLElement | null = null;
      try {
        target = document.querySelector<HTMLElement>(hash);
      } catch {
        return;
      }
      if (!target) return;

      event.preventDefault();
      // section có `scroll-mt-24` nên scrollIntoView tự chừa chỗ cho header fixed
      target.scrollIntoView({ behavior: "smooth" });
      // dọn hash (kể cả hash cũ sẵn có, ví dụ vào bằng /#work rồi bấm mục khác)
      window.history.replaceState(null, "", location.pathname + location.search);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}