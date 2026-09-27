import {
  Geist,
  JetBrains_Mono,
  Playfair_Display,
  Baloo_2,
  Press_Start_2P,
} from "next/font/google";

/**
 * Font duy dung chung cho ca hai root layout ((vi) va (en)).
 * Khong gan o component: `next/font` phai chay o module, va goi trong
 * component lam moi bien moi lan render.
 */
export const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "vietnamese"],
});

export const mono = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin", "vietnamese"],
});

export const playfair = Playfair_Display({
  variable: "--font-editorial",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const baloo = Baloo_2({
  variable: "--font-round",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const pixel = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** chuoi class gom het bien CSS cua 5 font, dan vao <html className> */
export const FONT_CLASS = `${geist.variable} ${mono.variable} ${playfair.variable} ${baloo.variable} ${pixel.variable} h-full antialiased`;
