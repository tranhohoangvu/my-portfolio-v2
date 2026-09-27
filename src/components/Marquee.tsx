"use client";

import { marquee } from "@/data/projects";

/** 1 hàng marquee — nội dung lặp 4 lần để nối liền vô hạn */
function Row({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  return (
    <div className="group flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center gap-8 pr-8 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 font-mono text-sm text-dim"
          >
            {item}
            <span className="text-cyan" aria-hidden>
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Dải công nghệ cuộn vô hạn — 2 hàng, hàng dưới chạy ngược chiều */
export function Marquee() {
  const items = [...marquee, ...marquee, ...marquee, ...marquee];

  return (
    <div
      aria-hidden
      className="flex flex-col gap-3 border-y border-line py-5 select-none"
    >
      <Row items={items} />
      <Row items={items} reverse />
    </div>
  );
}