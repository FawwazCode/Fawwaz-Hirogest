"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ContactLink = {
  label: string;
  href: string;
  value: string;
};

type ContactProps = {
  title?: string;
  subtitle?: string;
  email?: string;
  github?: string;
  linkedin?: string;
};

function buildLinks({
  email,
  github,
  linkedin,
}: {
  email: string;
  github: string;
  linkedin: string;
}): ContactLink[] {
  return [
    {
      label: "Email",
      href: `mailto:${email}`,
      value: email,
    },
    {
      label: "GitHub",
      href: github,
      value: github.replace(/^https?:\/\//, ""),
    },
    {
      label: "LinkedIn",
      href: linkedin,
      value: linkedin.replace(/^https?:\/\//, ""),
    },
  ];
}

export default function Contact({
  title = "Contact",
  subtitle = "Let’s build something great. Reach out anytime.",
  email = "hirogest23@gmail.com",
  github = "https://github.com/FawwazCode",
  linkedin = "https://www.linkedin.com/in/fawwaz-hirogest-putra-andaya/",
}: ContactProps) {
  const reduceMotion = false;
  const links = buildLinks({ email, github, linkedin });

  return (
    <section id="contact" className="relative w-full border-t border-black/5">
      <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-10 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-pretty text-sm leading-7 tracking-tight text-zinc-600 sm:text-base">
            {subtitle}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group rounded-2xl border border-black/10 bg-white px-5 py-4 text-left shadow-[0_18px_55px_-45px_rgba(0,0,0,0.22)] transition will-change-transform hover:-translate-y-0.5 hover:scale-[1.01] hover:border-black/15 hover:shadow-[0_18px_65px_-40px_rgba(0,0,0,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-1)/0.45)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold tracking-tight text-zinc-900">
                      {l.label}
                    </div>
                    <div className="mt-1 text-sm tracking-tight text-zinc-600 group-hover:text-zinc-900 transition-colors">
                      {l.value}
                    </div>
                  </div>
                  <span className="text-zinc-500 transition group-hover:text-zinc-900">
                    ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

