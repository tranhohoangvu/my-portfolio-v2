"use client";

import { useMemo } from "react";
import { useLang } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { stack } from "@/data/stack";
import { experience } from "@/data/experience";
import { certificates, CERT_CATEGORIES, CERT_TAGS } from "@/data/certificates";
import { QUICK_COMMANDS, API_ENDPOINTS } from "@/data/console";
import { CONTENT_EN } from "@/data/content.en";
import type { Project } from "@/data/projects";

/**
 * Tra ve NOI DUNG da bien dich theo ngon ngu hien tai.
 * - lang = "vi" -> dung nguyen ban trong src/data/*.ts
 * - lang = "en" -> gop phan `CONTENT_EN`; thieu du lieu tu fallback ve tieng Viet
 *
 * Component chi can doi `profile.x` thanh `c.profile.x` va tu dong doi theo ngon ngu.
 */
export function useContent() {
  const { lang } = useLang();

  return useMemo(() => {
    const en = CONTENT_EN;
    const isEn = lang === "en";

    return {
      lang,

      profile: isEn
        ? {
            ...profile,
            /* ten hien thi doi dang chu: "Trần Hồ Hoàng Vũ" -> "Tran Ho Hoang Vu" */
            name: en.profile.nameAscii,
            role: en.profile.role,
            headline: [...en.profile.headline],
            location: en.profile.location,
            workMode: en.profile.workMode,
            stackLine: en.profile.stackLine,
            stats: en.profile.stats.map((s) => ({ ...s, decimals: 0 })),
            cvs: profile.cvs.map((cv, i) => ({
              ...cv,
              note: en.profile.cvNotes[i] ?? cv.note,
            })),
            profileJson: en.profile.profileJson.map(([k, v]) => [k, v] as [string, string]),
            intro: en.profile.intro,
            about: {
              paragraphs: en.profile.about.paragraphs,
              values: en.profile.about.values.map((v) => ({ ...v })),
            },
            education: {
              ...profile.education,
              school: en.profile.education.school,
              major: en.profile.education.major,
              courses: [...en.profile.education.courses],
              awards: en.profile.education.awards.map((a) => ({ ...a })),
            },
            research: en.profile.research.map((r) => ({ ...r })),
            contact: {
              status: en.profile.contact.status,
              blurb: en.profile.contact.blurb,
            },
            terminal: en.profile.terminal.map((x) => ({ ...x })),
            preloader: [...en.profile.preloader],
          }
        : profile,

      stack: isEn
        ? stack.map((g) => ({
            ...g,
            label: en.stack[g.id as keyof typeof en.stack]?.label ?? g.label,
            meta: en.stack[g.id as keyof typeof en.stack]?.meta ?? g.meta,
          }))
        : stack,

      experience: isEn ? en.experience.map((j) => ({ ...j })) : experience,

      /**
       * DU AN — chi ghep ban dich khi `lang === "en"`.
       * Khi `vi` phai tra ve `projects` goc 1:1 de moi doan `desc` / `summary` /
       * `highlights` / `badge` deu la tieng Viet (truoc day khoi nay khong co
       * dieu kien `isEn`, nen ca trang `/vi` cung hien noi dung tieng Anh).
       *
       * `CONTENT_EN` khai bao `as const` nen `highlights` la `readonly string[]` —
       * ep lai `Project` bang `{ ...p, ...t, highlights: [...t.highlights] }`.
       * `name` / `type` / `year` / `tags` / `role` giong nhau hai ngon ngu nen
       * `...p` giu nguyen, chi 3 truong van duoi day bi ghi de.
       */
      projects: isEn
        ? projects.map((p) => {
            const t = en.projects[p.slug as keyof typeof en.projects];
            if (!t) return p;
            return {
              ...p,
              ...t,
              /* "Moi nhat" -> "Latest" */
              badge: p.badge === "Mới nhất" ? en.badgeLatest : p.badge,
              highlights: [...t.highlights],
            } as Project;
          })
        : projects,

      /**
       * Chuong chi: tieu de/issuer/ky nang giong nhau o hai ngon ngu,
       * chi mo ta + nhan loc + the loai can ban dich.
       */
      certificates: isEn
        ? certificates.map((c) => {
            const desc = en.certDesc[c.id as keyof typeof en.certDesc];
            const skills =
              c.id === "aptis-esol" ? [...en.certSkillsAptis] : [...c.skills];
            return {
              ...c,
              desc: desc ?? c.desc,
              skills,
            };
          })
        : certificates,

      /** nhan loc + the loai, doi theo ngon ngu */
      certCategories: isEn
        ? CERT_CATEGORIES.map((x) => ({
            ...x,
            label:
              en.certCategories[x.id as keyof typeof en.certCategories] ??
              x.label,
          }))
        : CERT_CATEGORIES,

      /** nhan loai in tren the, doi theo ngon ngu */
      certTags: isEn ? en.certTags : CERT_TAGS,

      /** mo ta nhan lenh / nhan endpoint trong console */
      consoleQuick: isEn
        ? QUICK_COMMANDS.map((q) => ({
            ...q,
            desc:
              en.consoleQuick[q.cmd.toLowerCase() as keyof typeof en.consoleQuick] ??
              q.desc,
          }))
        : QUICK_COMMANDS,

      consoleApi: isEn
        ? API_ENDPOINTS.map((e) => ({
            ...e,
            label: en.consoleApi[e.path as keyof typeof en.consoleApi] ?? e.label,
          }))
        : API_ENDPOINTS,
    };
  }, [lang]);
}