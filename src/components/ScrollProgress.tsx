"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={`pointer-events-none fixed inset-x-0 top-0 z-90 h-0.5 origin-left bg-gradient-to-r from-cyan via-lime to-violet transition-opacity duration-500 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    />
  );
}