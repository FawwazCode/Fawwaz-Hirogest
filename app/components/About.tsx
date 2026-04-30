"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useRef } from "react";

type AboutProps = {
  title?: string;
  paragraph?: string;
  name?: string;
};

export default function About({
  title = "About Me",
  paragraph = "I’m a developer who enjoys turning ideas into polished, high-performance interfaces. I care about clean architecture, accessible UI, and details that make products feel premium—balancing speed, readability, and delightful interactions.",
  name = "Fawwaz Hirogest -- FrontEnd Developer"
}: AboutProps) {
  const reduceMotion = false;

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(pointerY, [0, 1], [10, -10]), { damping: 30, stiffness: 100 });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-10, 10]), { damping: 30, stiffness: 100 });

  const imageRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = imageRef.current?.getBoundingClientRect();
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

  return (
    <section id="about" className="relative w-full border-t border-black/5">
      <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-10 sm:py-28">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
          className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 text-center sm:gap-14 lg:grid-cols-[420px_1fr] lg:gap-16 lg:text-left"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -40, filter: "blur(8px)" },
              visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="mx-auto w-full max-w-[360px] lg:max-w-none" 
            style={{ perspective: 1000 }}
          >
            <motion.div 
              ref={imageRef}
              onMouseMove={handlePointerMove}
              onMouseLeave={handlePointerLeave}
              style={{ rotateX, rotateY }}
              tabIndex={0}
              className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_18px_55px_-40px_rgba(0,0,0,0.25)] transition-all duration-700 ease-[0.22,1,0.36,1] hover:shadow-[0_25px_65px_-40px_rgba(0,0,0,0.3)] focus:outline-none"
            >
              <div className="pointer-events-none absolute inset-0 z-10 opacity-60 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-0 group-focus:opacity-0 group-active:opacity-0">
                <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-r from-[rgb(var(--accent-1)/0.3)] to-[rgb(var(--accent-2)/0.3)] blur-3xl" />
              </div>
              <div className="relative">
                <Image
                  src="/image/profile.jpg"
                  alt="Profile photo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  priority={false}
                  className="grayscale transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105 group-hover:grayscale-0 group-active:scale-105 group-active:grayscale-0 group-focus:scale-105 group-focus:grayscale-0"
                />
              </div>
            </motion.div>
          </motion.div>

          <div>
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 } }
              }}
              className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl"
            >
              {title}
            </motion.h2>
            <motion.div 
              variants={{
                hidden: { opacity: 0, scaleX: 0 },
                visible: { opacity: 1, scaleX: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 } }
              }}
              className="mx-auto mt-6 h-1 w-20 origin-center rounded-full bg-gradient-to-r from-[rgb(var(--accent-1)/0.75)] to-[rgb(var(--accent-2)/0.75)] lg:origin-left lg:mx-0" 
            />
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 } }
              }}
              className="mt-8 text-pretty text-sm leading-relaxed tracking-tight text-zinc-600 sm:text-base lg:text-lg lg:leading-8"
            >
              {paragraph}
            </motion.p>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 } }
              }}
              className="mt-8 text-pretty text-sm leading-relaxed tracking-tight text-zinc-400 sm:text-base lg:text-lg lg:leading-8"
            >
              {name}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

