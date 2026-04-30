"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionTemplate } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

type HeroProps = {
  name?: string;
  highlight?: string;
  subtitle?: string;
};

export default function Hero({
  name = "FRONTEND",
  highlight = "DEVELOPER",
  subtitle = "",
}: HeroProps) {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  const floatX = useSpring(useTransform(pointerX, [0, 1], [-18, 18]), {
    damping: 22,
    stiffness: 100,
  });
  const floatY = useSpring(useTransform(pointerY, [0, 1], [-14, 14]), {
    damping: 22,
    stiffness: 100,
  });

  const glowX = useSpring(useTransform(pointerX, [0, 1], [20, -20]), {
    damping: 26,
    stiffness: 120,
  });
  const glowY = useSpring(useTransform(pointerY, [0, 1], [10, -10]), {
    damping: 26,
    stiffness: 120,
  });

  const textRotateX = useSpring(useTransform(pointerY, [0, 1], [10, -10]), { damping: 30, stiffness: 80 });
  const textRotateY = useSpring(useTransform(pointerX, [0, 1], [-10, 10]), { damping: 30, stiffness: 80 });

  const bgFloatX1 = useSpring(useTransform(pointerX, [0, 1], [-40, 40]), { damping: 40, stiffness: 50 });
  const bgFloatY1 = useSpring(useTransform(pointerY, [0, 1], [-40, 40]), { damping: 40, stiffness: 50 });

  const bgFloatX2 = useSpring(useTransform(pointerX, [0, 1], [30, -30]), { damping: 40, stiffness: 50 });
  const bgFloatY2 = useSpring(useTransform(pointerY, [0, 1], [30, -30]), { damping: 40, stiffness: 50 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      pointerX.set((event.clientX - rect.left) / rect.width);
      pointerY.set((event.clientY - rect.top) / rect.height);
    },
    [pointerX, pointerY]
  );

  const handlePointerLeave = useCallback(() => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }, [pointerX, pointerY]);

  useEffect(() => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }, [pointerX, pointerY]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white text-zinc-950">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed top-0 left-0 w-full px-6 py-4 sm:px-10 sm:py-6 z-[100] flex items-center justify-center sm:justify-between backdrop-blur-md bg-white/70 border-b border-black/5"
      >
        <div className="text-sm font-medium text-zinc-900 w-auto text-center sm:text-left">
          Fawwaz Hirogest
        </div>
        <nav className="hidden sm:flex items-center justify-end w-auto gap-8 text-sm font-medium text-zinc-800">
          <a href="#about" tabIndex={0} className="group relative hover:text-zinc-950 transition-colors focus:outline-none">
            About
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-zinc-950 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus:scale-x-100 group-active:scale-x-100" />
          </a>
          <a href="#techstack" tabIndex={0} className="group relative hover:text-zinc-950 transition-colors focus:outline-none">
            Tech Stack
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-zinc-950 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus:scale-x-100 group-active:scale-x-100" />
          </a>
          <a href="#projects" tabIndex={0} className="group relative hover:text-zinc-950 transition-colors focus:outline-none">
            Projects
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-zinc-950 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus:scale-x-100 group-active:scale-x-100" />
          </a>
          <a href="#contact" tabIndex={0} className="group relative hover:text-zinc-950 transition-colors focus:outline-none">
            Contact
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-zinc-950 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus:scale-x-100 group-active:scale-x-100" />
          </a>
        </nav>
      </motion.header>

      <div className="pointer-events-none absolute inset-0 bg-white" />

      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Lingkaran dipisah ke sudut-sudut */}
        <motion.div 
          style={{ x: bgFloatX1, y: bgFloatY1 }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
          className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-[rgba(220,38,38,0.15)] blur-[140px]" 
        />
        <motion.div 
          style={{ x: bgFloatX2, y: bgFloatY2 }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
          className="absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-[rgba(0,0,0,0.12)] blur-[140px]" 
        />
        <motion.div 
          style={{ x: bgFloatX2, y: bgFloatY1 }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
          className="absolute -bottom-[10%] -left-[20%] h-[400px] w-[400px] rounded-full bg-[rgba(220,38,38,0.1)] blur-[120px]" 
        />
        <motion.div 
          style={{ x: bgFloatX1, y: bgFloatY2 }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
          className="absolute -top-[10%] -right-[20%] h-[400px] w-[400px] rounded-full bg-[rgba(0,0,0,0.08)] blur-[120px]" 
        />
        
        {/* Garis grid dibuat lebih tebal dan membentuk kotak-kotak */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(15,23,42,0.06),rgba(15,23,42,0.06)_2px,transparent_2px,transparent_40px),repeating-linear-gradient(90deg,rgba(15,23,42,0.06),rgba(15,23,42,0.06)_2px,transparent_2px,transparent_40px)]" />
      </motion.div>

      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32"
      >
        <motion.div
          ref={containerRef}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          className="relative w-full"
        >
          <motion.div
            style={{ x: glowX, y: glowY }}
            className="pointer-events-none absolute -left-10 top-16 h-80 w-80 rounded-full bg-[rgba(0,0,0,0.08)] blur-3xl"
          />
          <motion.div
            style={{ x: floatX, y: floatY }}
            className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-[rgba(220,38,38,0.1)] blur-3xl"
          />

          <div className="relative" style={{ perspective: 1000 }}>
            <motion.div 
              style={{ rotateX: textRotateX, rotateY: textRotateY }}
              className="flex flex-col items-center justify-center gap-3 text-center sm:gap-4"
            >
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  whileHover={{ scale: 1.05, y: -8, rotate: -1.5, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                  className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.81] tracking-[-0.05em] text-zinc-950"
                >
                  {name}
                </motion.h1>
              </div>

              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                  whileHover={{ scale: 1.05, y: -8, rotate: 1.5, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                  className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.81] tracking-[-0.05em] text-transparent"
                  style={{ WebkitTextStroke: "1.8px rgba(15,23,42,0.95)" }}
                >
                  {highlight}
                </motion.h1>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                className="max-w-3xl text-xs sm:text-sm font-medium uppercase tracking-[0.35em] text-zinc-500 md:text-base"
              >
                Subtle motion, premium scale, and an elevated portfolio presence.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
