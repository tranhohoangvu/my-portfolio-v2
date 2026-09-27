export type Theme = {
  id: string;
  index: string;
  name: string;
  desc: string;
  /** màu preview dùng cho card theme switcher */
  preview: { bg: string; accent: string; ink: string };
};

export const themes: Theme[] = [
  {
    id: "cyberpunk",
    index: "01",
    name: "Cyberpunk",
    desc: "Nền đen, neon cyan, lưới kỹ thuật",
    preview: { bg: "#05070a", accent: "#22d3ee", ink: "#a3e635" },
  },
  {
    id: "minimalism",
    index: "02",
    name: "Minimalism",
    desc: "Trắng, viền mảnh, tối giản tuyệt đối",
    preview: { bg: "#fafafa", accent: "#111111", ink: "#9a9a9a" },
  },
  {
    id: "maximalism",
    index: "03",
    name: "Maximalism",
    desc: "Màu rực, khối lớn, viền đậm, bóng cứng",
    preview: { bg: "#fff1d6", accent: "#e0006b", ink: "#5b2bff" },
  },
  {
    id: "surreal",
    index: "04",
    name: "Surreal",
    desc: "Gradient mộng mị, khối méo, mềm và lạ",
    preview: { bg: "#f6ecff", accent: "#c084fc", ink: "#818cf8" },
  },
  {
    id: "swiss",
    index: "05",
    name: "Swiss",
    desc: "Lưới nghiêm ngặt, đỏ – đen – trắng",
    preview: { bg: "#ffffff", accent: "#e10600", ink: "#767676" },
  },
  {
    id: "y2k",
    index: "06",
    name: "Y2K",
    desc: "Chrome, xanh bong bóng, ánh kim 2000s",
    preview: { bg: "#060d24", accent: "#7df9ff", ink: "#ffd6f7" },
  },
  {
    id: "editorial",
    index: "07",
    name: "Editorial",
    desc: "Giấy kem, chữ serif, như trang tạp chí",
    preview: { bg: "#f6f1e7", accent: "#a4432f", ink: "#2f4858" },
  },
  {
    id: "pixel",
    index: "08",
    name: "Pixel art",
    desc: "8-bit, viền cứng, bóng vuông, xanh lân tinh",
    preview: { bg: "#0f1020", accent: "#4ade80", ink: "#facc15" },
  },
  {
    id: "clay",
    index: "09",
    name: "Clay",
    desc: "Đất sét pastel, bo tròn cực lớn, bóng mềm",
    preview: { bg: "#eeecfb", accent: "#6d5ae0", ink: "#fca5a5" },
  },
  {
    id: "glass",
    index: "10",
    name: "Glass Morphism",
    desc: "Kính mờ trên nền gradient, viền sáng",
    preview: { bg: "#0b1220", accent: "#38bdf8", ink: "#5eead4" },
  },
];

export const themeIds = themes.map((t) => t.id);

export const isThemeId = (value: unknown): value is string =>
  typeof value === "string" && themeIds.includes(value);