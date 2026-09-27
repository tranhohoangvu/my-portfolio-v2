"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { useContent } from "@/lib/useContent";
import { localePath } from "@/lib/nav";

/** đồng hồ ICT (Asia/Ho_Chi_Minh) cập nhật mỗi giây */
function useIctClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const update = () => {
      const parts = formatter.formatToParts(new Date());
      const get = (type: string) =>
        parts.find((part) => part.type === type)?.value ?? "00";
      setTime(`${get("hour")}:${get("minute")}:${get("second")}`);
    };

    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

export function Footer() {
  const c = useContent();
  const time = useIctClock();
  const pathname = usePathname();
  const isHome = pathname === "/vi" || pathname === "/en";
  const { lang, t } = useLang();

  return (
    <footer className="border-t border-line pt-10 pb-28 md:pb-24">
      <div className="container-x flex flex-col gap-6 font-mono text-[0.6875rem] text-faint md:flex-row md:items-center md:justify-between">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>© 2026 {c.profile.name}</span>
          <span aria-hidden>·</span>
          <span>{t("footer.built")}</span>
        </p>

        <p className="flex items-center gap-4">
          <span className="text-dim">ICT {time}</span>
          <a
            href={c.profile.cvHref}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="transition-colors hover:text-cyan"
          >
            cv.pdf
          </a>
          <a
            href={isHome ? "#top" : localePath(lang, "/")}
            data-cursor="link"
            className="transition-colors hover:text-cyan"
          >
            ↑ top
          </a>
        </p>
      </div>
    </footer>
  );
}