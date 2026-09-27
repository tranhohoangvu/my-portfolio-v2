"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useContent } from "@/lib/useContent";
import { useLang } from "@/lib/i18n";
import { CONSOLE_BANNER } from "@/data/console";
import { SectionHeader } from "@/components/SectionHeader";
import { fadeUp, inView } from "@/lib/animations";

type Line = { id: number; text: string; tone?: "cmd" | "ok" | "err" | "dim" };

/** Banner mo man hinh - khoi tao san de khong nhay man hinh trong */
const makeBanner = (helpLine: string): Omit<Line, "id">[] => [
  { text: CONSOLE_BANNER.version, tone: "ok" },
  { text: CONSOLE_BANNER.host, tone: "dim" },
  { text: CONSOLE_BANNER.sub, tone: "dim" },
  {
    text: "System Online | Environment: Production Showcase | Status: 200 OK",
    tone: "ok",
  },
  { text: helpLine, tone: "dim" },
];

let seq = 0;

export function Console() {
  const c = useContent();
  const { t } = useLang();
  const { projects, stack, profile, certificates } = c;
  const QUICK_COMMANDS = c.consoleQuick;
  const API_ENDPOINTS = c.consoleApi;
  const [lines, setLines] = useState<Line[]>(() =>
    makeBanner(t("sec.console.help")).map((line) => ({ ...line, id: seq++ })),
  );
  const [value, setValue] = useState("");
  const [tab, setTab] = useState<"cli" | "api">("cli");
  const [endpoint, setEndpoint] = useState(API_ENDPOINTS[0].path);
  const [apiOut, setApiOut] = useState<string>("");
  const historyRef = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = (...items: Omit<Line, "id">[]) =>
    setLines((prev) => [
      ...prev,
      ...items.map((item) => ({ ...item, id: seq++ })),
    ]);

  /* Cuộn xuống cuối vùng output khi có dòng mới.
     `scrollIntoView` se cuộn TAT CA cac ancestor scrollable ke ca trang,
     nen khi reload/noi dung doi se nhay sang section Console/GitHub.
     Chi cuộn chinh div output la du. */
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = boxRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    historyRef.current.push(cmd);
    push({ text: `${CONSOLE_BANNER.user}:${CONSOLE_BANNER.path}$ ${cmd}`, tone: "cmd" });

    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "vu --help" || cmd === "help") {
      QUICK_COMMANDS.filter((q) => q.cmd !== "clear").forEach((q) =>
        push({ text: `  ${q.cmd.padEnd(24)} ${q.desc}`, tone: "dim" }),
      );
      return;
    }
    if (cmd === "vu --bio") {
      push(
        { text: JSON.stringify({ name: profile.name, role: profile.role, school: profile.education.school, major: profile.education.major, gpa: profile.gpa, based: profile.location }, null, 2) },
      );
      return;
    }
    if (cmd === "vu --skills") {
      stack.forEach((g) => {
        push({ text: ` ${g.label}`, tone: "ok" });
        g.items.forEach((it) =>
          push({
            text: `    ${it.name.padEnd(22)}${
              it.slugs.length > 0
                ? t("sec.console.projects").replace("{0}", String(it.slugs.length))
                : "—"
            }${it.note ? "  · " + it.note : ""}`,
            tone: "dim",
          }),
        );
      });
      return;
    }
    if (cmd === "vu --fetch-projects") {
      push(
        {
          text: `> GET /api/v1/projects · 200 OK  (${projects.length} ${t("sec.console.records")})`,
          tone: "dim",
        },
        ...projects.map(
          (p) =>
            ({
              text: `    ${p.name.padEnd(28)} ${p.type}    ${p.year}`,
              tone: "dim",
            }) as Omit<Line, "id">,
        ),
      );
      return;
    }
    if (cmd === "vu --contact") {
      push(
        { text: `email    ${profile.email}`, tone: "dim" },
        { text: `phone    ${profile.phone}`, tone: "dim" },
        { text: `github   ${profile.github}`, tone: "dim" },
        { text: `linkedin ${profile.linkedin}`, tone: "dim" },
        { text: `based    ${profile.location}`, tone: "dim" },
      );
      return;
    }
    if (cmd === "vu --cv") {
      profile.cvs.forEach((c) => push({ text: `  /${c.file}    ${c.label}`, tone: "dim" }));
      return;
    }
    if (cmd === "curl /api/v1/health") {
      push(
        { text: "> GET /api/v1/health · 200 OK", tone: "dim" },
        { text: JSON.stringify({ status: "ok", service: "portfolio-api", uptime_s: 128_430, version: "2.4.0" }, null, 2) },
      );
      return;
    }
    if (cmd.startsWith("curl") || cmd.startsWith("vu ")) {
      push({ text: `command not found: ${cmd.split(" ")[0]} · ${t("sec.console.notFound")}`, tone: "err" });
      return;
    }
    push({ text: `command not found: ${cmd} · ${t("sec.console.notFound")}`, tone: "err" });
  };

  const send = () => {
    const ep = API_ENDPOINTS.find((e) => e.path === endpoint);
    if (!ep) return;
    setApiOut(
      JSON.stringify(
        {
          endpoint: ep.path,
          method: ep.method,
          status: 200,
          count:
            ep.path === "/api/v1/projects"
              ? projects.length
              : ep.path === "/api/v1/skills"
                ? stack.length
                : ep.path === "/api/v1/certificates"
                  ? certificates.length
                  : undefined,
          note: t("sec.console.simulated"),
        },
        null,
        2,
      ),
    );
  };

  const TONE = {
    cmd: "text-cyan",
    ok: "text-lime",
    err: "text-rose-400",
    dim: "text-dim",
  } as const;

  return (
    <section id="console" className="scroll-mt-20 md:scroll-mt-24" aria-label="Console">
      <div className="container-x">
        <SectionHeader
          index="07" section="console"
          label="console"
          title={t("sec.console.title")}
          lead={t("sec.console.lead")}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="panel rounded-card mt-10 overflow-hidden p-0"
        >
          {/* thanh tiêu đề + tab */}
          <div className="term-bar flex flex-wrap items-center gap-3 border-b border-line px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-lime/70" />
            </span>
            <span className="font-mono text-[0.6875rem] text-faint">
              {CONSOLE_BANNER.version}
            </span>
            <div className="ml-auto flex gap-1" role="tablist" aria-label={t("sec.console.tablist")}>
              {(["cli", "api"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={tab === k}
                  data-cursor="link"
                  onClick={() => setTab(k)}
                  className={`mono-label cursor-pointer rounded-sm px-3 py-1 transition-colors ${
                    tab === k ? "bg-cyan/15 text-cyan" : "text-faint hover:text-dim"
                  }`}
                >
                  {k === "cli" ? t("sec.console.cli") : t("sec.console.api")}
                </button>
              ))}
            </div>
          </div>

          {tab === "cli" ? (
            <>
              <div
                ref={boxRef}
                onClick={() => inputRef.current?.focus()}
                className="hide-scrollbar h-80 cursor-text overflow-y-auto p-4 font-mono text-xs leading-relaxed"
              >
                {lines.map((line) => (
                  <pre
                    key={line.id}
                    className={`${TONE[line.tone ?? "dim"]} whitespace-pre-wrap break-words font-mono`}
                  >
                    {line.text}
                  </pre>
                ))}
              </div>

              {/* chip lệnh nhanh */}
              <div className="flex flex-wrap gap-1.5 border-t border-line px-4 py-2.5">
                {QUICK_COMMANDS.map((q) => (
                  <button
                    key={q.cmd}
                    type="button"
                    data-cursor="link"
                    onClick={() => run(q.cmd)}
                    title={q.desc}
                    className="mono-label cursor-pointer rounded-sm border border-line px-2 py-1 text-faint transition-colors hover:border-cyan hover:text-cyan"
                  >
                    {q.cmd}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 border-t border-line px-4 py-3">
                <span className="shrink-0 font-mono text-xs text-cyan">
                  {CONSOLE_BANNER.user}:{CONSOLE_BANNER.path}$
                </span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      run(value);
                      setValue("");
                    }
                  }}
                  data-cursor="text"
                  placeholder={t("sec.console.placeholder")}
                  aria-label={t("sec.console.input")}
                  className="min-w-0 flex-1 bg-transparent font-mono text-xs text-fg outline-none placeholder:text-faint"
                />
              </div>
            </>
          ) : (
            <div className="p-4">
              <p className="mono-label mb-2 text-faint">endpoint</p>
              <ul className="mb-4 space-y-1.5">
                {API_ENDPOINTS.map((ep) => (
                  <li key={ep.path}>
                    <button
                      type="button"
                      data-cursor="link"
                      onClick={() => setEndpoint(ep.path)}
                      className={`flex w-full cursor-pointer items-center gap-2 rounded-sm border px-3 py-2 text-left font-mono text-xs transition-colors ${
                        endpoint === ep.path
                          ? "border-cyan bg-cyan/10 text-cyan"
                          : "border-line text-dim hover:border-dim"
                      }`}
                    >
                      <span
                        className={ep.method === "GET" ? "text-lime" : "text-amber-400"}
                      >
                        {ep.method}
                      </span>
                      <span className="truncate">{ep.path}</span>
                      <span className="ml-auto hidden shrink-0 text-faint sm:inline">
                        {ep.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={send}
                data-cursor="link"
                className="rounded-card bg-cyan px-4 py-2 font-mono text-xs font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
              >
                {t("sec.console.send")}
              </button>

              {apiOut ? (
                <pre className="mt-4 overflow-x-auto rounded-card border border-line bg-void-soft p-3 font-mono text-xs leading-relaxed text-dim">
                  {apiOut}
                </pre>
              ) : null}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
