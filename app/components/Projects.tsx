"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Custom scrollbar hide utility
const scrollbarHide = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

type Project = {
  title: string;
  description: string;
  tech: string[];
  imageSrc: string;
  liveHref?: string;
  githubHref?: string;
};

const projects: Project[] = [
  {
    title: "Freelance Dashboard",
    description:
      "A modern freelance management dashboard built with Next.js and Tailwind CSS, designed to manage projects, clients, tasks, invoices, and analytics in one clean and responsive platform.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    imageSrc:
    "https://mini.s-shot.ru/1366x768/JPEG/1366/Z100/?https://fawwaz-code-freelance-dashboard.vercel.app/",
    liveHref: "https://fawwaz-code-freelance-dashboard.vercel.app/",
  },
  {
    title: "System Ticketing Management",
    description:
      "Develop a ticket management system to assist the helpdesk team in monitoring and resolve tickets efficiently",
    tech: ["Next.js", "Tailwind CSS"],
    imageSrc:
         "projects/interactive-kanban-dashboard.png",
    liveHref: "#",
  },
  {
    title: "Nexora E-commerce",
    description:
      "Build a modern e-commerce platform for managing products, orders, and customer purchases with ease",
    tech: ["Next.js", "React.js", "Tailwind CSS", "shadcn/ui", "Lucide React", "PostgreSQL"],
    imageSrc:
      "https://mini.s-shot.ru/1366x768/JPEG/1366/Z100/?https://nexora-livid-iota.vercel.app/",
    liveHref: "https://nexora-fawwazcodes-projects.vercel.app/",
  },
  {
    title: "Xinren Dev (Toko Pribadi)",
    description:
      "Build a modern e-commerce platform for managing products, orders, and customer purchases with ease",
    tech: ["Next.js", "Tailwind CSS", "shadcn/ui", "Lucide React"],
    imageSrc:
      "https://mini.s-shot.ru/1366x768/PNG/1366/Z100/?https://xinren-dev.vercel.app/",
    liveHref: "https://xinren-dev.vercel.app/",
  },
  {
    title: "Landing Page Padel",
    description:
    "A modern padel club landing page featuring a dynamic UI, smooth animations, responsive design, and an engaging user experience for showcasing court facilities, booking options, and brand identity.",    
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    imageSrc:
    "https://mini.s-shot.ru/1366x768/PNG/1366/Z100/?https://landing-page-padel-1.vercel.app/",
    // "projects/landing-page-padel.png",
    liveHref: "https://landing-page-padel-1.vercel.app/",
  }, 
  {
    title: "Landing Page Cafe",
    description:
      "A modern cafe landing page featuring elegant UI, smooth animations, responsive design, and an engaging user experience for showcasing menu and brand identity.",    
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    imageSrc:
    "projects/landing-page-cafe.png",
    liveHref: "https://contoh-landing-page-cafe.vercel.app/",
  }, 
];

export default function Projects() {
  const reduceMotion = false;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.85;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  } as const;

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  return (
    <section id="projects" className="relative w-full border-t border-black/5">
      <style>{scrollbarHide}</style>
      <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-10 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Projects
          </h2>

          <p className="mt-4 text-pretty text-sm leading-7 tracking-tight text-zinc-600 sm:text-base">
            A curated selection of work—focused on clean UI, performance, and
            thoughtful details.
          </p>
        </motion.div>

        <div className="mt-12 relative sm:mt-14">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-1)/0.6)] sm:-translate-x-4 sm:p-4"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-zinc-700 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-1)/0.6)] sm:translate-x-4 sm:p-4"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-zinc-700 sm:h-6 sm:w-6" />
          </button>

          {/* Scroll Container */}
          <motion.div
            ref={scrollContainerRef}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide sm:gap-7"
          >
            {projects.map((p) => (
              <motion.article
                key={p.title}
                variants={fadeUp}
                className="group relative flex-shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_55px_-45px_rgba(0,0,0,0.22)] transition will-change-transform hover:-translate-y-0.5 hover:scale-[1.01] hover:border-black/15 hover:shadow-[0_18px_65px_-40px_rgba(0,0,0,0.28)] w-[85vw] snap-center sm:w-[45vw] md:w-[42vw] lg:w-[400px] xl:w-[450px]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gradient-to-r from-[rgb(var(--accent-1)/0.18)] to-[rgb(var(--accent-2)/0.18)] blur-3xl" />
                </div>

                <div className="relative">
                  {/* UPDATE: bg-black diubah jadi bg-zinc-50 agar lebih rapi jika ada ruang kosong (letterbox) */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-black/10 bg-zinc-50">
                    <Image
                      src={p.imageSrc}
                      alt={`${p.title} preview`}
                      fill
                      unoptimized
                      className="object-contain opacity-90 transition duration-500 group-hover:opacity-100 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 400px"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/0 to-white/10 pointer-events-none" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-pretty text-lg font-semibold tracking-tight text-zinc-950">
                      {p.title}
                    </h3>

                    <p className="mt-2 text-pretty text-sm leading-7 tracking-tight text-zinc-600">
                      {p.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-medium tracking-tight text-zinc-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <Link
                        href={p.liveHref ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[rgb(var(--accent-1)/1)] to-[rgb(var(--accent-2)/1)] px-4 py-2 text-xs font-semibold tracking-tight text-white ring-1 ring-white/10 transition hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-1)/0.6)]"
                      >
                        Live Demo
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}