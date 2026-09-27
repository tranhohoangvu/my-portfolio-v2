/**
 * Kiem tra nhanh server: moi route `/vi|/<en>/work/<slug>` phai render
 * dung ngon ngu (mo ta du an lay tu dung nguon du lieu cua lang do).
 *
 * Chay: npx next start -p 3210  (mot cua so rieng)
 *       node scripts/check-i18n.mjs
 */
const BASE = process.env.BASE_URL ?? "http://localhost:3210";

const SLUGS = [
  "schoolops",
  "bookingcare",
  "pdf-vision-ocr",
  "coursehub",
  "ecommerce",
  "vietnamese-ocr",
  "nlp-translation",
  "stock-ml",
  "warehouse",
  "pos",
];

/**
 * Tho text khoi script/style de kiem tra phan noi dung render thuc te.
 * Bo qua khoi `script` cua Next vi chung co the chua ca hai ban dich.
 */
function body(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ");
}

let failed = 0;

/** Danh sach doan text tieng Viet that su (khong phai ten rieng). */
const VI_PROBES = [
  "Nền tảng quản lý vận hành trường",
  "Hệ thống đặt lịch khám bệnh",
  "Nền tảng thương mại điện tử",
  "Phần mềm quản lý kho",
  "Hệ thống POS bán lẻ",
  "Tối ưu hóa truy vấn Raw SQL",
  "Xem chi tiết",
];

for (const lang of ["vi", "en"]) {
  for (const slug of SLUGS) {
    const url = `${BASE}/${lang}/work/${slug}`;
    const res = await fetch(url);
    const raw = await res.text();
    const html = body(raw);

    const problems = [];
    if (!res.ok) problems.push(`HTTP ${res.status}`);
    if (lang === "en") {
      for (const p of VI_PROBES) {
        if (html.includes(p)) problems.push(`con text VI: "${p}"`);
      }
      /* ten du an co dau la ten rieng, duoc phep giu nguyen (da xac nhan) */
    }

    const title = /<title>([^<]*)<\/title>/.exec(raw)?.[1] ?? "";

    if (problems.length) {
      failed++;
      console.log(`FAIL /${lang}/work/${slug} — ${problems.join("; ")}`);
    } else {
      console.log(`ok   /${lang}/work/${slug}  ${title.slice(0, 60)}`);
    }
  }
}

/** Trang chu + 404 + redirect cu */
for (const p of ["/vi", "/en"]) {
  const res = await fetch(`${BASE}${p}`, { redirect: "manual" });
  const html = body(await res.text());
  const problems = [];
  if (!res.ok) problems.push(`HTTP ${res.status}`);
  if (p === "/en" && html.includes("Nền tảng quản lý vận hành trường")) {
    problems.push("con text VI o trang chu EN");
  }
  if (problems.length) {
    failed++;
    console.log(`FAIL ${p} — ${problems.join("; ")}`);
  } else {
    console.log(`ok   ${p}`);
  }
}

/** `/` va `/work/x` phai 308 sang `/vi` */
for (const p of ["/", "/work/schoolops"]) {
  const res = await fetch(`${BASE}${p}`, { redirect: "manual" });
  const loc = res.headers.get("location") ?? "";
  const ok = res.status === 308 && loc.includes("/vi");
  if (!ok) {
    failed++;
    console.log(`FAIL ${p} -> ${res.status} ${loc}`);
  } else {
    console.log(`ok   ${p} -> 308 ${loc}`);
  }
}

console.log(failed ? `\n${failed} route loi` : "\nTat ca route dung ngon ngu.");

/* ------------------------------------------------------------------ */
/* Quet token co dau con sot tren phan noi dung render cua ban EN.     */
/* ------------------------------------------------------------------ */

const SLUGS_ALL = SLUGS;

/** Ky tu co dau — bat buoc phai la tieng Viet neu lang = "en". */
const VI_CHARS =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

/**
 * @param html  HTML server render da bo script/style
 * @returns danh sach token co dau
 */
function viTokens(html) {
  const text = html.replace(/<[^>]+>/g, " ");
  return [
    ...new Set(
      (text.match(/[\p{L}\d]{2,}/gu) ?? []).filter((w) => VI_CHARS.test(w)),
    ),
  ];
}

console.log("\n--- Quet text con dau tren ban EN ---");
for (const p of ["/en", ...SLUGS_ALL.map((s) => `/en/work/${s}`)]) {
  const html = body(await (await fetch(`${BASE}${p}`)).text());
  const tokens = viTokens(html);
  if (tokens.length) {
    console.log(`  ${p}: ${tokens.join(", ")}`);
  }
}

console.log("\n--- Section chung chi (the + nut + ghi chu Aptis) ---");
/** [route, nhan nut PDF, ghi chu redacted, nhan kiem tra khong duoc lo] */
const CERT_CASES = [
  ["/vi", "Xem PDF", "Bản online đã che thông tin nhạy cảm", "Show Credential"],
  ["/en", "View PDF", "The online copy redacts sensitive data", "Xem PDF"],
];
/** moi the 1 logo + 1 nut PDF; 6/8 the co nut credential (Techbase + Aptis khong co) */
const CERT_TOTAL = 8;
const CERT_CREDENTIALS = 6;
for (const [route, pdf, redacted, forbidden] of CERT_CASES) {
  const html = body(await (await fetch(`${BASE}${route}`)).text());
  const count = (needle) => html.split(needle).length - 1;
  const problems = [];

  /* dem tren `class` cua `<span>` boc logo — `body()` da bo khoi <svg> nen
     khong dem duoc `class` ben trong logo */
  if (count("h-12 w-12 shrink-0") !== CERT_TOTAL) {
    problems.push(`${count("h-12 w-12 shrink-0")} logo (can ${CERT_TOTAL})`);
  }
  if (count(pdf) !== CERT_TOTAL) {
    problems.push(`${count(pdf)} nut "${pdf}" (can ${CERT_TOTAL})`);
  }
  if (html.includes(forbidden)) problems.push(`lo nhan "${forbidden}"`);
  /* ghi chu chi danh cho Aptis nen phai xuat hien DUNG MOT LAN tren ca trang */
  const times = count(redacted);
  if (times !== 1) problems.push(`ghi chu redacted xuat hien ${times} lan (can = 1)`);

  const cred = count("border-lime/50");
  if (cred !== CERT_CREDENTIALS) {
    problems.push(`${cred} nut credential (can ${CERT_CREDENTIALS})`);
  }

  if (problems.length) {
    failed++;
    console.log(`FAIL ${route} — ${problems.join("; ")}`);
  } else {
    console.log(
      `ok   ${route} — ${CERT_TOTAL} the, ${CERT_TOTAL} logo, ${cred} nut credential, ghi chu Aptis 1 lan`,
    );
  }
}

process.exit(failed ? 1 : 0);
