"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
    title: "Interactive Kanban Dashboard",
    description:
      "A responsive task management board featuring drag-and-drop interactions, optimistic UI updates, and smooth animations.",
    tech: ["React", "TypeScript", "Framer Motion"],
    imageSrc:
         "projects/interactive-kanban-dashboard.png",
    liveHref: "#",
  },
  {
    title: "SaaS Landing Page",
    description:
      "A premium, conversion-optimized landing page with scroll-triggered 3D effects, glassmorphism UI, and perfect accessibility.",
    tech: ["Next.js", "Tailwind CSS", "GSAP"],
    imageSrc:
      "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1200'%20height='675'%3E%3Cdefs%3E%3CradialGradient%20id='g'%20cx='50%25'%20cy='35%25'%20r='78%25'%3E%3Cstop%20offset='0%25'%20stop-color='%23dc2626'%20stop-opacity='.52'/%3E%3Cstop%20offset='55%25'%20stop-color='%23ef4444'%20stop-opacity='.16'/%3E%3Cstop%20offset='100%25'%20stop-color='%23000000'%20/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect%20width='1200'%20height='675'%20fill='url(%23g)'/%3E%3C/svg%3E",
    liveHref: "#",
  },
  {
    title: "Event Ticketing System",
    description:
      "A comprehensive event ticketing platform featuring interactive seat selection maps, real-time availability updates, and a secure checkout flow.",
    tech: ["Next.js", "Tailwind CSS", "Stripe"],
    imageSrc:
      "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1200'%20height='675'%3E%3Cdefs%3E%3CradialGradient%20id='g'%20cx='50%25'%20cy='40%25'%20r='80%25'%3E%3Cstop%20offset='0%25'%20stop-color='%23f87171'%20stop-opacity='.45'/%3E%3Cstop%20offset='50%25'%20stop-color='%23b91c1c'%20stop-opacity='.20'/%3E%3Cstop%20offset='100%25'%20stop-color='%23000000'%20/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect%20width='1200'%20height='675'%20fill='url(%23g)'/%3E%3C/svg%3E",
    liveHref: "#",
  },
];

export default function Projects() {
  const reduceMotion = false;

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

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 sm:gap-7 md:grid-cols-2 lg:grid-cols-2"
        >
          {projects.map((p) => (
            <motion.article
              key={p.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_55px_-45px_rgba(0,0,0,0.22)] transition will-change-transform hover:-translate-y-0.5 hover:scale-[1.01] hover:border-black/15 hover:shadow-[0_18px_65px_-40px_rgba(0,0,0,0.28)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gradient-to-r from-[rgb(var(--accent-1)/0.18)] to-[rgb(var(--accent-2)/0.18)] blur-3xl" />
              </div>

              <div className="relative">
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-black/10 bg-black">
                  <Image
                    src={p.imageSrc}
                    alt={`${p.title} preview`}
                    fill
                    unoptimized
                    className="object-cover object-top opacity-90 transition duration-500 group-hover:opacity-100 group-hover:scale-[1.02]"                    
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/0 to-white/10" />
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
    </section>
  );
}