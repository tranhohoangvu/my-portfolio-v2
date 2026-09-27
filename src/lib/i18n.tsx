"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Lang = "vi" | "en";

const STORAGE_KEY = "portfolio-lang";

/** Chuoi giao dien dung chung. Noi dung dai (project, chung chi) lay theo `lang`. */
const DICT = {
  vi: {
    "nav.home": "Trang chủ",
    "nav.about": "Giới thiệu",
    "nav.cv": "CV",
    "nav.projects": "Dự án",
    "nav.skills": "Kỹ năng",
    "nav.certs": "Chứng chỉ",
    "nav.github": "GitHub",
    "nav.console": "Console",
    "nav.contact": "Liên hệ",

    "a11y.skip": "Bỏ qua tới nội dung",

    "nf.body":
      "Trang này không tồn tại hoặc dự án đã được đổi đường dẫn. Quay lại trang chủ để xem tiếp nhé.",
    "nf.home": "← Về trang chủ",
    "nf.work": "Xem dự án",

    /* profile.json — khoa/nghanh la ten rieng, giu nguyen; nhan moi dich */
    "edu.school": "Trường Đại học Tôn Đức Thắng",
    "edu.courses": "Môn đã học",
    "edu.awards": "Chứng chỉ & giải thưởng",

    "footer.built": "Dựng bằng Next.js · Tailwind · Motion",

    "pd.back": "cd ../work",
    "pd.backList": "← Về danh sách dự án",
    "pd.stack": "stack.json",
    "pd.techCount": "{0} công nghệ",
    "pd.demo": "bản demo — chưa publish",

    "sec.about.label": "Về bản thân",
    "sec.about.title": "Hành trình kỹ thuật & định hướng",
    "sec.about.lead": "Nền tảng học vấn, kinh nghiệm thực chiến và hướng phát triển phần mềm & AI.",

    "sec.cv.label": "Hồ sơ năng lực",
    "sec.cv.title": "Ba hướng đi, một mục tiêu",
    "sec.cv.lead": "Ba bản CV riêng cho từng vị trí. Cập nhật T9/2026 — Mở xem trước hoặc tải về.",
    "sec.cv.download": "Tải pdf",
    "sec.cv.view": "Xem",
    "sec.cv.exp": "Kinh nghiệm thực tế",
    "sec.work.label": "Sản phẩm & dự án",
    "sec.work.title": "Sản phẩm mình đã xây",
    "sec.work.lead": "Mười dự án hoàn chỉnh, từ hệ thống quản lý trường học tới mô hình học sâu.",

    "sec.stack.label": "Ngăn xếp công nghệ",
    "sec.stack.title": "Kỹ năng & chuyên môn kỹ thuật",
    "sec.stack.lead": "Bốn trụ cột. Huy hiện trên mỗi icon là số dự án thật. Bấm một icon để xem dự án tương ứng.",

    "sec.certs.label": "Chứng chỉ",
    "sec.certs.title": "Được chứng nhận, đã xác minh",
    "sec.certs.lead": "Tám Chứng chỉ từ Microsoft, Google, The Linux Foundation, DeepLearning.AI, Techbase và British Council.",
    "sec.certs.all": "Tất cả",
    "sec.certs.pdf": "Xem PDF",
    "sec.certs.credential": "Xem credential",
    "sec.certs.redacted": "Bản online đã che thông tin nhạy cảm (cccd, qr) — bản gốc đối chiếu gửi qua email.",
    "sec.certs.filter": "Lọc chứng chỉ",
    "sec.certs.tab": "{0} — {1} chứng chỉ",
    "sec.certs.score": "Điểm",
    "sec.certs.issued": "Cấp",
    "sec.certs.id": "Mã:",
    "sec.certs.empty": "Nhóm này chưa có chứng chỉ nào.",

    "cert.req.open": "Yêu cầu bản gốc",
    "cert.req.title": "Yêu cầu bản gốc chứng chỉ",
    "cert.req.name": "Họ và tên của bạn",
    "cert.req.email": "Email nhận bản gốc",
    "cert.req.company": "Đơn vị / công ty tuyển dụng",
    "cert.req.note": "Ghi chú / mục đích đối chiếu",
    "cert.req.sending": "Đang gửi",
    "cert.req.send": "Gửi yêu cầu",
    "cert.req.close": "Đóng",
    "cert.req.ok": "Đã gửi! Mình sẽ gửi bản scan gốc qua email sớm nhất.",
    "cert.req.err": "Gửi lỗi — vui lòng gửi trực tiếp tới",

    "sec.github.label": "github",
    "sec.github.title": "Code mỗi ngày. Học liên tục.",
    "sec.github.lead": "Số liệu và hoạt động dưới đây được tải trực tiếp từ GitHub API, không phải ảnh tĩnh.",
    "sec.github.loading": "Đang tải",
    "sec.github.error": "Không gọi được GitHub API (bị chặn mạng hoặc chạm giới hạn 60 req/giờ).",
    "sec.github.empty": "Chưa có sự kiện công khai gần đây.",
    "sec.github.repos": "Kho công khai",
    "sec.github.followers": "Người theo dõi",
    "sec.github.following": "Đang theo dõi",
    "sec.github.since": "Tài khoản tạo",
    "sec.github.activity": "Hoạt động gần đây",
    "sec.github.profile": "Hồ sơ",
    "sec.github.cta": "Xem github profile",
    "sec.github.desc": "Mở nguồn mở cho 10 dự án kỹ thuật: web full-stack, mô hình học sâu và hệ thống quản lý.",

    "sec.console.label": "console",
    "sec.console.title": "Bảng điều khiển dòng lệnh & API",
    "sec.console.lead": "Khám phá portfolio qua dòng lệnh Linux, hoặc chuyển sang tab REST API để thử các endpoint.",
    "sec.console.cli": "system shell",
    "sec.console.api": "rest api explorer",
    "sec.console.send": "Gửi request",
    "sec.console.endpoint": "endpoint",
    "sec.console.quick": "Lệnh nhanh:",

    "sec.contact.label": "liên hệ",
    "sec.contact.title": "Cùng xây thứ gì đó chạy được",
    "sec.contact.lead": "Gửi email hoặc dùng form bên dưới — mình phản hồi trong vòng 24 giờ.",
    "sec.contact.email": "Gửi email",
    "sec.contact.copy": "Sao chép email",
    "sec.contact.copied": "Đã sao chép",
    "sec.contact.social": "Mạng xã hội",
    "sec.contact.form.title": "Hoặc gửi lời nhắn",
    "sec.contact.form.name": "Họ và tên",
    "sec.contact.form.email": "Email",
    "sec.contact.form.topic": "Bạn quan tâm đến chủ đề gì?",
    "sec.contact.form.msg": "Lời nhắn",
    "sec.contact.form.send": "Gửi lời nhắn",
    "sec.contact.form.sending": "Đang gửi",
    "sec.contact.form.ok": "Đã gửi thành công! Mình sẽ phản hồi sớm.",
    "sec.contact.form.err": "Gửi lỗi. Vui lòng thử lại hoặc gửi email trực tiếp.",
    "sec.contact.form.required": "Vui lòng điền đủ họ tên, email và lời nhắn.",

    "hero.cta.projects": "./xem-du-an",
    "hero.cta.cv": "Tải CV",
    "hero.cv.pick": "Chọn bản CV",

    "hdr.nav": "Điều hướng chính",
    "hdr.navMobile": "Điều hướng chính (mobile)",
    "hdr.toEn": "Switch to English",
    "hdr.toVi": "Chuyển sang tiếng Việt",
    "hdr.menuOpen": "Mở menu",
    "hdr.menuClose": "Đóng menu",
    "rail.aria": "Chuyển nhanh section",

    "dock.theme.title": "Đổi phong cách hiển thị",
    "dock.theme.sr": "Mở danh sách 10 phong cách. Đang dùng:",
    "theme.title": "Chọn phong cách hiển thị",
    "theme.kicker": "Phong cách thiết kế",
    "theme.hint": "Chuyển theme nhanh (phím T)",
    "theme.list": "Danh sách theme",


    "sec.stack.aria": "Kỹ năng",
    "sec.stack.skillTitle": "{0} — Ứng dụng trong {1} dự án — bấm để xem",
    "sec.stack.using": "Dự án dùng {0}",
    "sec.stack.close": "Đóng",
    "sec.stack.empty":
      "Công nghệ này chưa gắn với dự án cụ thể nào trong danh sách.",

    "sec.work.aria": "Dự án",
    "sec.work.count": "{0} đang chạy thật / {1} dự án tiêu biểu",
    "sec.work.open": "Mở {0} trên trình duyệt",
    "sec.work.detail": "Xem chi tiết",

    "sec.cv.aria": "CV",
    "sec.cv.beDesc": "Định hướng Backend: RESTful API, cơ sở dữ liệu, tự động hoá quy trình (Jira API / OpenClaw) và clean code.",
    "sec.cv.feDesc": "Định hướng Frontend: Next.js, React, TypeScript, TailwindCSS và phát triển theo component.",
    "sec.cv.aiDesc": "Định hướng AI: ML/DL, NLP (Transformer MT), Computer Vision (OCR) và pipeline triển khai.",
    "sec.cv.previewAlt": "Xem trước CV {0}",

    "sec.contact.aria": "Liên hệ",
    "sec.contact.copyBtn": "Sao chép email",
    "sec.contact.copyShort": "Sao chép email",
    "sec.contact.cvDownload": "↓ Tải CV (PDF)",

    "sec.github.aria": "Hoạt động GitHub",
    "sec.github.errShort": "Không tải được",
    "sec.github.events": "{0} sự kiện",

    "sec.console.help": "Gõ 'vu --help' để xem danh sách lệnh.",
    "sec.console.tablist": "Chế độ console",
    "sec.console.projects": "{0} dự án",
    "sec.console.records": "bản ghi",
    "sec.console.notFound": "gõ 'vu --help'",
    "sec.console.simulated": "Mô phỏng — dữ liệu lấy từ portfolio tĩnh",
    "sec.console.intro": "Khám phá portfolio qua giao diện dòng lệnh Linux, hoặc chuyển sang tab REST API để thử các endpoint.",
    "sec.console.placeholder": "Gõ lệnh (ví dụ: vu --help) rồi Enter",
    "sec.console.input": "Nhập lệnh console",

    "sec.about.aria": "Giới thiệu",
    "hero.aria": "Giới thiệu",

    "pd.done.label": "Đã làm",
    "pd.done.title": "Ba việc chính trong dự án",
    "pd.done.lead": "Mỗi dự án đều bắt đầu từ một bài toán cụ thể của khách hàng, không làm theo mẫu rồi đổi màu.",
    "pd.tech.label": "Công nghệ",
    "pd.tech.title": "Dự án này dùng gì",
    "pd.tech.lead": "Chỉ liệt kê những công nghệ thực sự chạy trong sản phẩm, không tính thư viện trang trí.",
    "pd.other": "Dự án khác",
    "pd.prev": "← dự án trước",
    "pd.next": "Dự án sau →",
    "pd.open": "Mở",

    "footer.tagline": "Kiến tạo giá trị bằng mã nguồn",
    "footer.rights": "© 2026 Trần Hồ Hoàng Vũ.",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.cv": "CV",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.certs": "Certificates",
    "nav.github": "GitHub",
    "nav.console": "Console",
    "nav.contact": "Contact",

    "a11y.skip": "Skip to content",

    "nf.body":
      "This page does not exist, or the project has been moved. Head back home to keep browsing.",
    "nf.home": "← Back home",
    "nf.work": "See projects",

    /* ten truong/mon la ten rieng — giu nguyen, chi nhan moi dich */
    "edu.school": "Ton Duc Thang University",
    "edu.courses": "Courses taken",
    "edu.awards": "Certificates & awards",

    "footer.built": "Built with Next.js · Tailwind · Motion",

    "pd.back": "cd ../work",
    "pd.backList": "← Back to all projects",
    "pd.stack": "stack.json",
    "pd.techCount": "{0} technologies",
    "pd.demo": "demo build — not published yet",

    "sec.about.label": "About me",
    "sec.about.title": "Technical journey & direction",
    "sec.about.lead": "Academic background, hands-on experience and a direction in software & AI.",

    "sec.cv.label": "curriculum vitae",
    "sec.cv.title": "Three tracks, one goal",
    "sec.cv.lead": "Three CVs written for three different roles. Updated Sep 2026 — preview or download.",
    "sec.cv.download": "Download pdf",
    "sec.cv.view": "View",

    "sec.work.label": "Products & projects",
    "sec.work.lead": "Ten complete projects, from school management systems to deep learning models.",

    "sec.stack.label": "tech stack",
    "sec.stack.title": "Skills & technical expertise",

    "sec.certs.label": "certificates",
    "sec.certs.title": "Certified, verified",
    "sec.certs.lead": "Eight Certificates from Microsoft, Google, The Linux Foundation, DeepLearning.AI, Techbase and British Council.",
    "sec.certs.all": "All",
    "sec.certs.pdf": "View PDF",
    "sec.certs.credential": "Show Credential",
    "sec.certs.redacted": "The online copy redacts sensitive data (ID, QR) — request the original by email.",
    "sec.certs.filter": "Filter certificates",
    "sec.certs.tab": "{0} — {1} certificates",
    "sec.certs.score": "Score",
    "sec.certs.issued": "Issued",
    "sec.certs.id": "Certificate ID:",
    "sec.certs.empty": "No certificates in this group yet.",

    "cert.req.open": "Request original",
    "cert.req.title": "Request the original certificate",
    "cert.req.name": "Your full name",
    "cert.req.email": "Email to receive the original",
    "cert.req.company": "Company / hiring organisation",
    "cert.req.note": "Note / purpose of verification",
    "cert.req.sending": "Sending",
    "cert.req.send": "Send request",
    "cert.req.close": "Close",
    "cert.req.ok": "Sent! I will email the original scan as soon as possible.",
    "cert.req.err": "Failed to send — please email me directly at",

    "sec.github.label": "github",
    "sec.github.title": "Code every day. Keep learning.",
    "sec.github.lead": "The figures and activity below are fetched live from the GitHub API, not static images.",
    "sec.github.loading": "Loading",
    "sec.github.error": "Could not reach the GitHub API (network blocked or 60 req/hour limit).",
    "sec.github.empty": "No recent public events.",
    "sec.github.repos": "Public repositories",
    "sec.github.followers": "Followers",
    "sec.github.following": "Following",
    "sec.github.since": "Account created",
    "sec.github.activity": "Recent activity",
    "sec.github.profile": "Profile",
    "sec.github.cta": "View GitHub profile",
    "sec.github.desc": "Open source for 10 technical projects: full-stack web apps, deep learning models and management systems.",

    "sec.console.label": "console",
    "sec.console.title": "Interactive Terminal & API Console",
    "sec.console.lead": "Explore the portfolio through a Linux shell, or switch to the REST API tab to try endpoints.",
    "sec.console.cli": "system shell",
    "sec.console.api": "rest api explorer",
    "sec.console.send": "Send request",
    "sec.console.endpoint": "endpoint",
    "sec.console.quick": "Quick commands:",

    "sec.contact.label": "contact",
    "sec.contact.title": "Let us build something that runs",
    "sec.contact.lead": "Email me or use the form below — I reply within 24 hours.",
    "sec.contact.email": "Send email",
    "sec.contact.copy": "Copy email",
    "sec.contact.copied": "Copied",
    "sec.contact.social": "Social",
    "sec.contact.form.title": "Or leave a message",
    "sec.contact.form.name": "Full name",
    "sec.contact.form.email": "Email",
    "sec.contact.form.topic": "What is this about?",
    "sec.contact.form.msg": "Message",
    "sec.contact.form.send": "Send message",
    "sec.contact.form.sending": "Sending",
    "sec.contact.form.ok": "Sent successfully! I will reply as soon as possible.",
    "sec.contact.form.err": "Could not send. Please try again or email me directly.",
    "sec.contact.form.required": "Please fill in name, email and message.",

    "hero.cta.projects": "./view-projects",
    "hero.cta.cv": "Download CV",
    "hero.cv.pick": "Choose a CV",

    "hdr.nav": "Main navigation",
    "hdr.navMobile": "Main navigation (mobile)",
    "hdr.toEn": "Switch to English",
    "hdr.toVi": "Switch to Vietnamese",
    "hdr.menuOpen": "Open menu",
    "hdr.menuClose": "Close menu",
    "rail.aria": "Quick section jump",

    "dock.theme.title": "Change the display style",
    "dock.theme.sr": "Open the list of 10 styles. Current:",
    "theme.title": "Choose a display style",
    "theme.kicker": "Design style",
    "theme.hint": "Quick theme switch (T key)",
    "theme.list": "Theme list",


    "sec.stack.aria": "Skills",
    "sec.stack.lead": "Four pillars. The badge on each icon is the real project count. Click an icon to see the matching projects.",
    "sec.stack.skillTitle": "{0} — used in {1} projects — click to view",
    "sec.stack.using": "Projects using {0}",
    "sec.stack.close": "Close",
    "sec.stack.empty":
      "This technology is not linked to any specific project yet.",

    "sec.work.aria": "Projects",
    "sec.work.title": "Things I have built",
    "sec.work.count": "{0} running live / {1} flagship projects",
    "sec.work.open": "Open {0} in the browser",
    "sec.work.detail": "View details",

    "sec.cv.aria": "Curriculum vitae",
    "sec.cv.beDesc": "Backend track: RESTful APIs, databases, workflow automation (Jira API / OpenClaw) and clean code.",
    "sec.cv.feDesc": "Frontend track: Next.js, React, TypeScript, TailwindCSS and component-driven development.",
    "sec.cv.aiDesc": "AI track: ML/DL, NLP (Transformer MT), computer vision (OCR) and deployment pipelines.",
    "sec.cv.previewAlt": "Preview of the {0} CV",
    "sec.cv.exp": "Practical experience",

    "sec.contact.aria": "Contact",
    "sec.contact.copyBtn": "Copy email",
    "sec.contact.copyShort": "Copy email",
    "sec.contact.cvDownload": "↓ Download CV (PDF)",

    "sec.github.aria": "GitHub activity",
    "sec.github.errShort": "Could not load",
    "sec.github.events": "{0} events",

    "sec.console.help": "Type 'vu --help' to see the list of commands.",
    "sec.console.tablist": "Console mode",
    "sec.console.projects": "{0} projects",
    "sec.console.records": "Records",
    "sec.console.notFound": "Type 'vu --help'",
    "sec.console.simulated": "Simulated — data taken from the static portfolio",
    "sec.console.intro": "Explore the portfolio through a Linux shell, or switch to the REST API tab to try endpoints.",
    "sec.console.placeholder": "Type a command (e.g. vu --help) then Enter",
    "sec.console.input": "Console command input",

    "sec.about.aria": "About",
    "hero.aria": "Introduction",

    "pd.done.label": "What I built",
    "pd.done.title": "The three main things I did",
    "pd.done.lead": "Every project starts from a concrete customer problem, not a template with a new coat of paint.",
    "pd.tech.label": "Stack",
    "pd.tech.title": "What this project uses",
    "pd.tech.lead": "Only the technologies that actually run in the product, not decorative libraries.",
    "pd.other": "Other projects",
    "pd.prev": "← previous project",
    "pd.next": "Next project →",
    "pd.open": "Open",

    "footer.tagline": "Building value with source code",
    "footer.rights": "© 2026 Tran Ho Hoang Vu.",
  },
} as const;

export type DictKey = keyof (typeof DICT)["vi"];

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: DictKey) => string;
};

const LanguageContext = createContext<Ctx>({
  lang: "vi",
  setLang: () => { },
  t: (k) => DICT.vi[k] ?? String(k),
});

/**
 * Doi ngon ngu ngay tren trang, KHONG tai lai.
 *
 * `lang` la state cua provider (khoi tao tu `initialLang` cua URL). Khi doi:
 *  1. cap nhat state  -> moi component re-render ngay, khong reload trang
 *  2. `history.replaceState` -> ghi URL moi ma khong reload, de copy/share
 *     van ra dung ban ngon ngu
 *  3. `<html lang>` doi theo (anh huong doc man hinh)
 *
 * Server render theo URL nen tai lai (F5) van ra dung ngon ngu; client chi
 * "vuot qua" URL bang replaceState cho den khi nguoi dung F5 hoac mo link.
 */
function useLangStore(initialLang: Lang) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback(
    (next: Lang) => {
      setLangState(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* private mode - bo qua */
      }
      document.documentElement.lang = next;

      /* ghi lai URL ma khong reload: /vi/... <-> /en/... */
      const { pathname, search, hash } = window.location;
      const rest = pathname.replace(/^\/(vi|en)/, "") || "/";
      window.history.replaceState(
        null,
        "",
        `/${next}${rest}${search}${hash}`,
      );
    },
    [],
  );

  return [lang, setLang] as const;
}

export function LanguageProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: ReactNode;
}) {
  const [lang, setLang] = useLangStore(initialLang);

  const t = useCallback(
    (key: DictKey) =>
      (DICT[lang][key] as string) ?? DICT.vi[key] ?? String(key),
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}