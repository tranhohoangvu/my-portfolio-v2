"use client";

import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { ease, stagger } from "@/lib/animations";
import { useLang } from "@/lib/i18n";
import { NAV_ITEMS, SECTION_IDS } from "@/lib/nav";
import { useActiveSection } from "@/lib/useActiveSection";
import { useBooted } from "@/lib/useBooted";

const item: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

/**
 * Thanh action dọc bên trái: 6 section xếp dọc, mỗi mục có vạch dẫn,
 * mục đang xem chỉ có vạch dọc sáng + hào quang, không khoanh khung.
 * Chỉ hiện từ `xl` trở lên để không đè lên nội dung trên màn nhỏ.
 */
export function SectionRail() {
  const booted = useBooted();
  const active = useActiveSection(SECTION_IDS);
  const { t } = useLang();

  return (
    <motion.nav
      aria-label={t("rail.aria")}
      variants={stagger(0.07, 0.25)}
      initial="hidden"
      animate={booted ? "show" : "hidden"}
      className="group/rail pointer-events-none fixed top-1/2 left-0 z-60 hidden -translate-y-1/2 flex-col items-start pl-3 xl:flex"
    >
      {NAV_ITEMS.map((nav) => {
        const isActive = active === nav.href.slice(1);

        return (
          <motion.a
            key={nav.href}
            href={nav.href}
            data-cursor="link"
            aria-current={isActive ? "true" : undefined}
            variants={item}
            className="group pointer-events-auto relative flex min-h-10 items-center before:absolute before:-inset-x-3 before:-inset-y-1 before:content-['']"
          >
            {/* vạch dẫn — mục đang xem chỉ sáng lên, không khoanh khung.
                min-h-10 cố định chiều cao mọi mục bằng nhau nên rail không
                giật khi vạch active đổi từ ngang (h-px) sang dọc (h-4). */}
            <span
              aria-hidden
              className={`relative transition-all duration-500 ${
                isActive
                  ? "h-4 w-px bg-cyan shadow-[0_0_12px_1px_var(--color-cyan)]"
                  : "h-px w-5 bg-line group-hover:w-8 group-hover:bg-cyan group-hover:shadow-[0_0_10px_var(--color-cyan)]"
              }`}
            />

            {/* Nhãn ẩn mặc định, hiện TẤT CẢ khi rê vào rail (group/rail), và
                hiện riêng mục đang focus để bàn phím vẫn dùng được.
                Đặt absolute để không đẩy layout; giữ pointer-events để rê qua
                chính nhãn không nhấp nháy. Vẫn trong DOM nên screen reader đọc được. */}
            <span
              className={`absolute top-1/2 left-full z-20 ml-3 -translate-y-1/2 translate-x-1.5 font-mono text-xs tracking-wide whitespace-nowrap opacity-0 transition-all duration-300 group-hover/rail:translate-x-0 group-hover/rail:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 ${
                isActive ? "text-cyan" : "text-dim"
              }`}
            >
              {nav.label}
            </span>
          </motion.a>
        );
      })}
    </motion.nav>
  );
}