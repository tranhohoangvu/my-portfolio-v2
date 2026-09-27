"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/data/profile";
import { useLang } from "@/lib/i18n";
import { useContent } from "@/lib/useContent";
import { SectionHeader } from "@/components/SectionHeader";
import { fadeUp, inView, stagger } from "@/lib/animations";
import { useCardFx } from "@/lib/cardFx";

type GhUser = {
  login: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

type GhEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: { commits?: { message: string }[] };
};

const API = "https://api.github.com";

const EVENT_LABEL: Record<string, string> = {
  PushEvent: "push",
  CreateEvent: "create",
  PullRequestEvent: "pull_request",
  IssuesEvent: "issue",
  WatchEvent: "star",
  ForkEvent: "fork",
};

/** Số liệu thật lấy từ GitHub API, không dùng ảnh tĩnh. */
export function GitHub() {
  const [user, setUser] = useState<GhUser | null>(null);
  const [events, setEvents] = useState<GhEvent[]>([]);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const c = useContent();
  const { t } = useLang();
  const { onPointerMove } = useCardFx();

  useEffect(() => {
    let alive = true;
    const headers = { Accept: "application/vnd.github+json" };

    Promise.all([
      fetch(`${API}/users/${profile.slug}`, { headers }).then((r) =>
        r.ok ? r.json() : null,
      ),
      fetch(`${API}/users/${profile.slug}/events/public?per_page=12`, {
        headers,
      }).then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([u, e]) => {
        if (!alive) return;
        setUser(u);
        setEvents(Array.isArray(e) ? e : []);
        setState(u ? "ok" : "error");
      })
      .catch(() => {
        if (alive) setState("error");
      });

    return () => {
      alive = false;
    };
  }, []);

  const stats = [
    { value: user ? String(user.public_repos) : "", label: t("sec.github.repos") },
    { value: user ? String(user.followers) : "", label: t("sec.github.followers") },
    { value: user ? String(user.following) : "", label: t("sec.github.following") },
    { value: user ? String(user.created_at.slice(0, 7)) : "", label: t("sec.github.since") },
  ];

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });

  return (
    <section id="github" className="scroll-mt-20 md:scroll-mt-24" aria-label={t("sec.github.aria")}>
      <div className="container-x">
        <SectionHeader
          index="06" section="github"
          label="github"
          title={t("sec.github.title")}
          lead={t("sec.github.lead")}
        />

        {/* số liệu tài khoản */}
        <motion.dl
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="panel rounded-card mt-10 grid grid-cols-2 gap-px overflow-hidden bg-line md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="bg-panel px-4 py-5">
              <dd className="font-mono text-2xl text-cyan md:text-3xl">
                {stat.value}
              </dd>
              <dt className="mono-label mt-1.5 text-faint">{stat.label}</dt>
            </motion.div>
          ))}
        </motion.dl>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          {/* hoạt động gần đây */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            onPointerMove={onPointerMove}
            data-cursor="link"
            className="panel rounded-card fx-card p-5 md:p-6"
          >
            <span aria-hidden className="fx-glow" />
            <div className="flex items-baseline justify-between gap-3">
              <p className="mono-label text-cyan">{t("sec.github.activity")}</p>
              <span className="font-mono text-[0.6875rem] text-faint">
                {state === "loading"
                  ? t("sec.github.loading")
                  : state === "error"
                    ? t("sec.github.errShort")
                    : t("sec.github.events").replace("{0}", String(events.length))}
              </span>
            </div>

            {state === "loading" ? (
              <ul className="mt-4 space-y-2.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i} className="h-6 w-full animate-pulse rounded bg-line" />
                ))}
              </ul>
            ) : state === "error" ? (
              <p className="mt-4 text-sm text-dim">{t("sec.github.error")}</p>
            ) : events.length === 0 ? (
              <p className="mt-4 text-sm text-dim">{t("sec.github.empty")}</p>
            ) : (
              <ul className="mt-4 divide-y divide-line">
                {events.map((ev, i) => {
                  const repo = ev.repo?.name?.split("/")[1] ?? ev.repo?.name ?? "";
                  const msg =
                    ev.payload?.commits?.[0]?.message?.split("\n")[0] ?? "";
                  return (
                    <li key={i} className="flex items-start gap-3 py-2.5">
                      <span className="mono-label mt-0.5 w-16 shrink-0 text-faint">
                        {fmt(ev.created_at)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="font-mono text-xs text-lime">
                          {EVENT_LABEL[ev.type] ?? ev.type}
                        </span>{" "}
                        <span className="font-mono text-xs text-cyan">{repo}</span>
                        {msg ? (
                          <span className="mt-0.5 block truncate text-xs text-dim">
                            {msg}
                          </span>
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>

          {/* profile + liên kết */}
          <div className="space-y-5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              onPointerMove={onPointerMove}
              data-cursor="link"
              className="panel rounded-card fx-card p-5 md:p-6"
            >
              <span aria-hidden className="fx-glow" />
              <p className="mono-label text-cyan">{t("sec.github.profile")}</p>
              <p className="mt-3 text-lg font-semibold text-fg">
                {user?.name ?? c.profile.name}
              </p>
              <p className="mt-1 font-mono text-xs text-dim">@{profile.slug}</p>
              <p className="mt-4 text-sm leading-relaxed text-dim">
                {t("sec.github.desc")}
              </p>
            </motion.div>

            <a
              href={`https://${profile.github}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="rounded-card group flex w-full items-center justify-center gap-2 bg-cyan px-5 py-3.5 font-mono text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
            >
              {t("sec.github.cta")}
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}