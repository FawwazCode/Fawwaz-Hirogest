"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

const words = [
  "Salam",
  "Kenal",
  "Nama",
  "Saya",
  "Fawwaz",
  "Hirogest",
  "Putra",
  "Andaya",
  "Seorang",
  "FrontEnd",
  "Developer",
];

const entranceDuration = 0.7;
const holdDuration = 0.4;
const exitDuration = 0.7;
const fadeOutDuration = 0.4;

const openingAmbientStyles = `
  @keyframes opening-mesh-drift {
    0%, 100% { transform: translate(0%, 0%) scale(1); }
    50% { transform: translate(3%, -2%) scale(1.04); }
  }
  @keyframes opening-orb-float-a {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(24px, -18px); }
  }
  @keyframes opening-orb-float-b {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-20px, 14px); }
  }
  @keyframes opening-spotlight-pulse {
    0%, 100% { opacity: 0.55; }
    50% { opacity: 0.85; }
  }
`;

type OpeningScreenProps = {
  onComplete: () => void;
};

export default function OpeningScreen({ onComplete }: OpeningScreenProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);
  const hasStartedExitRef = useRef(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const startExit = useCallback(() => {
    if (hasStartedExitRef.current) return;
    hasStartedExitRef.current = true;
    setIsExiting(true);
  }, []);

  useEffect(() => {
    if (isExiting) return;

    const totalWordTime = (entranceDuration + holdDuration + exitDuration) * 1000;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1;
        }

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        timeoutRef.current = setTimeout(() => {
          startExit();
        }, totalWordTime);

        return prev;
      });
    }, totalWordTime);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isExiting, startExit]);

  const handleFadeComplete = () => {
    if (!hasStartedExitRef.current || hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    onCompleteRef.current();
  };

  const progress = (currentWordIndex + 1) / words.length;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: fadeOutDuration, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={handleFadeComplete}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#030303]"
      aria-hidden={isExiting}
    >
      <style>{openingAmbientStyles}</style>

      {/* Base cinematic gradient */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,#1a1a1f_0%,#030303_55%,#000000_100%)]"
        aria-hidden
      />

      {/* Animated mesh layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={
          reduceMotion
            ? undefined
            : { animation: "opening-mesh-drift 18s ease-in-out infinite" }
        }
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_15%_25%,rgba(239,68,68,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_20%,rgba(255,255,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_100%,rgba(220,38,38,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_210deg_at_50%_50%,rgba(239,68,68,0.08),transparent_35%,rgba(24,24,27,0.2)_65%,transparent)]" />
      </div>

      {/* Floating blur orbs */}
      <div
        className="pointer-events-none absolute -left-[12%] top-[18%] h-[min(55vw,420px)] w-[min(55vw,420px)] rounded-full bg-[rgb(var(--accent-1)/0.28)] blur-[100px]"
        style={
          reduceMotion
            ? undefined
            : { animation: "opening-orb-float-a 14s ease-in-out infinite" }
        }
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[8%] bottom-[12%] h-[min(48vw,360px)] w-[min(48vw,360px)] rounded-full bg-[rgb(var(--accent-2)/0.2)] blur-[90px]"
        style={
          reduceMotion
            ? undefined
            : { animation: "opening-orb-float-b 16s ease-in-out infinite" }
        }
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl"
        aria-hidden
      />

      {/* Center spotlight */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_38%_at_50%_48%,rgba(255,255,255,0.11),transparent_68%)]"
        style={
          reduceMotion
            ? undefined
            : { animation: "opening-spotlight-pulse 8s ease-in-out infinite" }
        }
        aria-hidden
      />

      {/* Depth vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]"
        aria-hidden
      />

      {/* Film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* Subtle grid depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        aria-hidden
      />

      {/* Word content — animation timing unchanged */}
      <motion.div
        initial={false}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center justify-center px-6"
      >
        <div className="relative flex items-center justify-center">
          <div
            className="pointer-events-none absolute -inset-x-16 -inset-y-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.12),transparent_70%)] blur-2xl"
            aria-hidden
          />

          <AnimatePresence mode="wait">
            {!isExiting && (
              <motion.div
                key={currentWordIndex}
                initial={{
                  opacity: 0,
                  y: -100,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 100,
                }}
                transition={{
                  duration: entranceDuration,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center"
              >
                <motion.h1
                  initial={{ filter: "blur(10px)" }}
                  animate={{ filter: "blur(0px)" }}
                  exit={{ filter: "blur(10px)" }}
                  transition={{
                    duration: entranceDuration,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-display text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-7xl"
                  style={{
                    textShadow:
                      "0 0 80px rgba(239, 68, 68, 0.22), 0 0 40px rgba(255, 255, 255, 0.18), 0 2px 24px rgba(0, 0, 0, 0.45)",
                  }}
                >
                  {words[currentWordIndex]}
                </motion.h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress rail */}
        <div className="mt-14 h-px w-32 overflow-hidden rounded-full bg-white/10 sm:w-40">
          <motion.div
            className="h-full origin-left rounded-full bg-gradient-to-r from-[rgb(var(--accent-1)/0.9)] to-[rgb(var(--accent-2)/0.7)] shadow-[0_0_12px_rgba(239,68,68,0.45)]"
            initial={false}
            animate={{ scaleX: progress }}
            transition={{ duration: entranceDuration, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
