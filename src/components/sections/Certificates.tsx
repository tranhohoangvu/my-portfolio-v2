"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { type Certificate } from "@/data/certificates";
import { useContent } from "@/lib/useContent";
import { useLang } from "@/lib/i18n";
import { SectionHeader } from "@/components/SectionHeader";
import { fadeUp, inView, stagger } from "@/lib/animations";
import { useCardFx } from "@/lib/cardFx";
import { CertRequestForm } from "@/components/Forms";
import { CertLogo } from "@/components/CertLogos";
import {
  ArrowRight,
  ArrowUpRight,
  AwardIcon,
  CalendarIcon,
  FileIcon,
  HashIcon,
} from "@/components/icons";
import { CERT_BTN_ACCENT, CERT_BTN_MUTED } from "@/lib/certUi";

type Filter = "all" | Certificate["category"];

/**
 * Danh sách thẻ: `amount: 0` (chỉ cần một px chạm khung hình) + `key={filter}`.
 *
 * `inView` mặc định dùng `amount: 0.25` nên sau khi lọc còn 1–2 thẻ, danh sách
 * thường nằm lọt dưới mép màn hình → `whileInView` không bắn, thẻ kẹt ở
 * `opacity: 0` và hiện ra như trống. Hạ ngưỡng + remount theo tab là đủ để mỗi
 * lần đổi bộ lọc đều chạy lại hiệu ứng vào.
 */
const listViewport = { once: true, amount: 0 } as const;

export function Certificates() {
  const [filter, setFilter] = useState<Filter>("all");
  const { onPointerMove } = useCardFx();
  const c = useContent();
  const { t } = useLang();
  const certificates = c.certificates;

  /** số thẻ của từng nhóm — in trên nút lọc */
  const counts = useMemo(() => {
    const out: Record<string, number> = { all: certificates.length };
    for (const cert of certificates) {
      out[cert.category] = (out[cert.category] ?? 0) + 1;
    }
    return out;
  }, [certificates]);

  const shown =
    filter === "all"
      ? certificates
      : certificates.filter((cert) => cert.category === filter);

  return (
    <section id="certs" className="scroll-mt-24" aria-label={t("sec.certs.title")}>
      <div className="container-x">
        <SectionHeader
          index="05" section="certs"
          label="certificates"
          title={t("sec.certs.title")}
          lead={t("sec.certs.lead")}
        />

        {/* bộ lọc — pill bo tròn, kèm số lượng chứng chỉ của mỗi nhóm */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-8 flex justify-center"
        >
          <div
            role="tablist"
            aria-label={t("sec.certs.filter")}
            className="flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full border border-line bg-panel/70 p-1.5 backdrop-blur"
          >
            {c.certCategories.map((cat) => {
              const active = filter === cat.id;
              const n = counts[cat.id] ?? 0;
              return (
                <button
                  key={cat.id}
                  id={`certs-tab-${cat.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="certs-panel"
                  aria-label={t("sec.certs.tab")
                    .replace("{0}", cat.label)
                    .replace("{1}", String(n))}
                  data-cursor="link"
                  onClick={() => setFilter(cat.id)}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-mono text-xs transition-colors ${
                    active
                      ? "bg-cyan text-on-accent"
                      : "text-dim hover:bg-line/50 hover:text-fg"
                  }`}
                >
                  <span className="whitespace-nowrap">{cat.label}</span>
                  <span
                    aria-hidden
                    className={`rounded-full border px-1.5 text-[0.625rem] leading-4 ${
                      active ? "border-on-accent/40" : "border-line"
                    }`}
                  >
                    {n}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <div
          id="certs-panel"
          role="tabpanel"
          aria-labelledby={`certs-tab-${filter}`}
          tabIndex={-1}
          className="mt-6 outline-none"
        >
          <motion.ul
            key={filter}
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={listViewport}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {shown.map((cert) => (
              <motion.li
                key={cert.id}
                variants={fadeUp}
                onPointerMove={onPointerMove}
                className="panel panel-hover rounded-card fx-card fx-clip group flex flex-col gap-4 p-5 sm:p-6"
              >
                <span aria-hidden className="fx-sheen" />

                {/* logo nhà cấp + nhãn nhóm */}
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card border border-line bg-void-soft p-2.5">
                    <CertLogo id={cert.logo} className="h-full w-full" />
                  </span>
                  <span className="mt-1 inline-flex min-w-0 max-w-[62%] items-center gap-1.5 rounded-full border border-cyan/40 bg-cyan/10 px-2.5 py-1 font-mono text-[0.6875rem] leading-4 text-cyan">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                    <span className="truncate">{c.certTags[cert.category]}</span>
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-fg">{cert.title}</h3>
                  <p className="mt-1.5 flex items-center gap-1.5 font-mono text-xs text-dim">
                    <AwardIcon className="h-3.5 w-3.5 shrink-0 text-faint" />
                    <span className="min-w-0">{cert.issuer}</span>
                  </p>
                </div>

                {cert.score ? (
                  <div className="rounded-card border border-line px-3 py-2">
                    <div className="flex items-baseline justify-between">
                      <span className="mono-label">{t("sec.certs.score")}</span>
                      <span className="font-mono text-sm text-cyan">
                        {cert.score.value}
                        <span className="text-xs text-faint"> / {cert.score.max}</span>
                      </span>
                    </div>
                    <div
                      className="mt-2 h-1 w-full overflow-hidden rounded-full bg-line"
                      role="img"
                      aria-label={`${t("sec.certs.score")}: ${cert.score.value} / ${cert.score.max}`}
                    >
                      <div
                        className="h-full rounded-full bg-cyan"
                        style={{
                          width: `${(Number(cert.score.value) / Number(cert.score.max)) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="mt-1 font-mono text-[0.6875rem] text-faint">
                      {cert.score.note}
                    </p>
                  </div>
                ) : null}

                <p className="text-sm leading-relaxed text-dim">{cert.desc}</p>

                <ul className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-card border border-cyan/25 bg-cyan/5 px-2 py-0.5 font-mono text-[0.6875rem] leading-4 text-cyan"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>

                {/* chân thẻ — `mt-auto` đẩy xuống đáy nên các nút luôn thẳng
                    hàng giữa những thẻ có độ dài mô tả khác nhau */}
                <div className="mt-auto space-y-3">
                  <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[0.6875rem] leading-4 text-faint">
                      <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
                      {t("sec.certs.issued")} {cert.date}
                    </span>
                    {cert.certId ? (
                      <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[0.6875rem] leading-4 text-faint">
                        <HashIcon className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">
                          {t("sec.certs.id")} {cert.certId}
                        </span>
                      </span>
                    ) : null}
                  </div>

                  {/* chỉ Aptis mới có bản online bị che thông tin nhạy cảm */}
                  {cert.id === "aptis-esol" ? (
                    <p className="rounded-card border border-amber/40 bg-amber/10 px-3 py-2 font-mono text-[0.6875rem] leading-relaxed text-amber">
                      {t("sec.certs.redacted")}
                    </p>
                  ) : null}

                  <div className="grid gap-2.5 sm:grid-cols-2">
                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className={CERT_BTN_MUTED}
                    >
                      <FileIcon className="h-4 w-4 shrink-0" />
                      {t("sec.certs.pdf")}
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </a>

                    {cert.credential ? (
                      <a
                        href={cert.credential}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="link"
                        className={CERT_BTN_ACCENT}
                      >
                        <ArrowUpRight className="h-4 w-4 shrink-0" />
                        {t("sec.certs.credential")}
                      </a>
                    ) : null}

                    {cert.id === "aptis-esol" ? (
                      <CertRequestForm
                        certId={cert.certId ?? cert.id}
                        className={CERT_BTN_MUTED}
                      />
                    ) : null}
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {shown.length === 0 ? (
            <p className="text-sm text-dim">{t("sec.certs.empty")}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
