"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import { useLang } from "@/lib/i18n";

const FORMSPREE = "https://formspree.io/f/mrbnrrgd";

type State = "idle" | "sending" | "ok" | "err";

const TOPICS_VI = [
  "Tuyển dụng Backend",
  "Tuyển dụng Frontend",
  "Tuyển dụng AI",
  "Hợp tác dự án",
  "Giao lưu / Khác",
];
const TOPICS_EN = [
  "Backend hiring",
  "Frontend hiring",
  "AI hiring",
  "Project collaboration",
  "Just saying hi",
];

const inputCls =
  "w-full rounded-card border border-line bg-void-soft px-3 py-2.5 font-mono text-sm text-fg outline-none transition-colors placeholder:text-faint focus:border-cyan";
const labelCls = "mono-label mb-1.5 block text-faint";

/** Form liên hệ  đẩy thẳng tới Formspree (không cần server action) */
export function ContactForm() {
  const { lang, t } = useLang();
  const [state, setState] = useState<State>("idle");
  const topics = lang === "vi" ? TOPICS_VI : TOPICS_EN;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (!data.name || !data.email || !data.message) {
      setState("err");
      return;
    }

    setState("sending");
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("ok");
    } catch {
      setState("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <p className="mono-label text-cyan">{t("sec.contact.form.title")}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="cf-name">
            {t("sec.contact.form.name")}
          </label>
          <input
            id="cf-name"
            name="name"
            required
            className={inputCls}
            placeholder={lang === "en" ? "Your name" : "Nguyễn Văn A"}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="cf-email">
            {t("sec.contact.form.email")}
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            className={inputCls}
            placeholder="name@company.com"
          />
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="cf-topic">
          {t("sec.contact.form.topic")}
        </label>
        <select id="cf-topic" name="topic" className={inputCls} defaultValue={topics[0]}>
          {topics.map((tp) => (
            <option key={tp} value={tp} className="bg-panel text-fg">
              {tp}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls} htmlFor="cf-msg">
          {t("sec.contact.form.msg")}
        </label>
        <textarea
          id="cf-msg"
          name="message"
          required
          rows={5}
          className={`${inputCls} resize-y`}
          placeholder={
            lang === "en"
              ? "Tell me about the role, the project or just say hello"
              : "Chia sẻ về cơ hội việc làm, dự án hoặc lời chào"
          }
        />
      </div>

      <input type="hidden" name="_subject" value={`Portfolio · ${profile.name}`} />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={state === "sending"}
          data-cursor="link"
          className="rounded-card bg-cyan px-5 py-3 font-mono text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {state === "sending" ? t("sec.contact.form.sending") : t("sec.contact.form.send")}
        </button>

        {state === "ok" ? (
          <p role="status" className="font-mono text-xs text-lime">
            {t("sec.contact.form.ok")}
          </p>
        ) : null}
        {state === "err" ? (
          <p role="alert" className="font-mono text-xs text-rose-400">
            {t("sec.contact.form.err")}  {profile.email}
          </p>
        ) : null}
      </div>
    </form>
  );
}

/**
 * Form yêu cầu bản gốc chứng chỉ Aptis (bản online đã che thông tin nhạy cảm).
 *
 * `className` cho phép thẻ chứng chỉ truyền vào đúng lớp nút dùng chung, để
 * nút "Yêu cầu bản gốc" rộng đúng bằng nút bên cạnh. Khi mở ra, form chiếm
 * trọn hai cột (`sm:col-span-2`) vì các ô nhập cần bề ngang.
 */
export function CertRequestForm({
  certId,
  className,
}: {
  certId: string;
  className?: string;
}) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !data.email) {
      setState("err");
      return;
    }
    setState("sending");
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("ok");
    } catch {
      setState("err");
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor="link"
        className={
          className ??
          "rounded-card border border-line px-3 py-1.5 font-mono text-xs text-fg transition-colors hover:border-cyan hover:text-cyan"
        }
      >
        {t("cert.req.open")}
      </button>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="sm:col-span-2 space-y-3 border-t border-line pt-4"
    >
      <p className="mono-label text-cyan">
        {t("cert.req.title")} {certId}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" required placeholder={t("cert.req.name")} className={inputCls} />
        <input name="email" type="email" required placeholder={t("cert.req.email")} className={inputCls} />
      </div>
      <input name="company" placeholder={t("cert.req.company")} className={inputCls} />
      <textarea
        name="note"
        rows={3}
        placeholder={t("cert.req.note")}
        className={`${inputCls} resize-y`}
      />
      <input
        type="hidden"
        name="_subject"
        value={`${t("cert.req.title")} ${certId}`}
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={state === "sending"}
          data-cursor="link"
          className="rounded-card bg-cyan px-4 py-2 font-mono text-xs font-semibold text-on-accent transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {state === "sending" ? t("cert.req.sending") : t("cert.req.send")}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          data-cursor="link"
          className="font-mono text-xs text-faint transition-colors hover:text-dim"
        >
          {t("cert.req.close")}
        </button>
        {state === "ok" ? (
          <p role="status" className="font-mono text-xs text-lime">
            {t("cert.req.ok")}
          </p>
        ) : null}
        {state === "err" ? (
          <p role="alert" className="font-mono text-xs text-rose-400">
            {t("cert.req.err")} {profile.email}
          </p>
        ) : null}
      </div>
    </form>
  );
}