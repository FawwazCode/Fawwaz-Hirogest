"use client";

import Link from "next/link";
import { FormEvent, useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";
import {
  Mail,
  Send,
  ArrowUpRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { ContactFormData } from "@/lib/contact";
import { FORMSPREE_ENDPOINT, submitToFormspree } from "@/lib/formspree";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.021C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.062 2.062 0 012.063-2.063 2.062 2.062 0 012.063 2.065 2.062 2.062 0 01-2.063 2.063zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.427.403a4.92 4.92 0 011.675.96 4.92 4.92 0 01.96 1.675c.163.457.349 1.257.403 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.427a4.92 4.92 0 01-.96 1.675 4.92 4.92 0 01-1.675.96c-.457.163-1.257.349-2.427.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.427-.403a4.92 4.92 0 01-1.675-.96 4.92 4.92 0 01-.96-1.675c-.163-.457-.349-1.257-.403-2.427C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.427a4.92 4.92 0 01.96-1.675 4.92 4.92 0 011.675-.96c.457-.163 1.257-.349 2.427-.403C8.416 2.175 8.796 2.163 12 2.163zm0 1.622c-3.15 0-3.516.012-4.746.068-1.008.046-1.555.215-1.918.357a3.27 3.27 0 00-1.197.78 3.27 3.27 0 00-.78 1.197c-.142.363-.311.91-.357 1.918-.056 1.23-.068 1.596-.068 4.746s.012 3.516.068 4.746c.046 1.008.215 1.555.357 1.918a3.27 3.27 0 00.78 1.197 3.27 3.27 0 001.197.78c.363.142.91.311 1.918.357 1.23.056 1.596.068 4.746.068s3.516-.012 4.746-.068c1.008-.046 1.555-.215 1.918-.357a3.27 3.27 0 001.197-.78 3.27 3.27 0 00.78-1.197c.142-.363.311-.91.357-1.918.056-1.23.068-1.596.068-4.746s-.012-3.516-.068-4.746c-.046-1.008-.215-1.555-.357-1.918a3.27 3.27 0 00-.78-1.197 3.27 3.27 0 00-1.197-.78c-.363-.142-.91-.311-1.918-.357-1.23-.056-1.596-.068-4.746-.068zM12 7.378a4.622 4.622 0 100 9.244 4.622 4.622 0 000-9.244zm0 1.622a3 3 0 110 6 3 3 0 010-6zm5.804-3.712a1.08 1.08 0 100 2.16 1.08 1.08 0 000-2.16z" />
    </svg>
  );
}

type ContactLink = {
  label: string;
  href: string;
  value: string;
  icon: React.ReactNode;
};

type ContactProps = {
  title?: string;
  subtitle?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  /** Override Formspree endpoint (defaults to FORMSPREE_ENDPOINT / env). */
  formspreeUrl?: string;
};

type FormStatus = "idle" | "loading" | "success" | "error";

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatSocialValue(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

function buildLinks({
  email,
  github,
  linkedin,
  instagram,
}: {
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
}): ContactLink[] {
  return [
    {
      label: "Email",
      href: `mailto:${email}`,
      value: email,
      icon: <Mail className="h-5 w-5" strokeWidth={1.5} />,
    },
    {
      label: "GitHub",
      href: github,
      value: formatSocialValue(github),
      icon: <GitHubIcon className="h-5 w-5" />,
    },
    {
      label: "LinkedIn",
      href: linkedin,
      value: formatSocialValue(linkedin),
      icon: <LinkedInIcon className="h-5 w-5" />,
    },
    {
      label: "Instagram",
      href: instagram,
      value: formatSocialValue(instagram),
      icon: <InstagramIcon className="h-5 w-5" />,
    },
  ];
}

const socialLinkClass =
  "glass-panel group flex items-center gap-4 rounded-2xl px-5 py-4 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-200/90 hover:shadow-[0_20px_50px_-18px_rgba(239,68,68,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2";

const socialIconClass =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-zinc-900 group-hover:to-zinc-800 group-hover:shadow-[0_0_22px_rgba(239,68,68,0.35)]";

const inputBase =
  "w-full rounded-xl border bg-white/80 px-4 py-3.5 text-sm text-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition-all duration-300 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(24,24,27,0.06)] focus:ring-0";

function validateClient(data: ContactFormData): FieldErrors {
  const errors: FieldErrors = {};
  if (data.website?.trim()) return errors;
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(data.email.trim()))
    errors.email = "Please enter a valid email.";
  if (!data.message.trim()) errors.message = "Message is required.";
  return errors;
}

export default function Contact({
  title = "Contact",
  subtitle = "Let's build something great. Reach out anytime.",
  email = "hirogest23@gmail.com",
  github = "https://github.com/FawwazCode",
  linkedin = "https://www.linkedin.com/in/fawwaz-hirogest-putra-andaya/",
  instagram = "https://www.instagram.com/fwzzz_x23",
  formspreeUrl = FORMSPREE_ENDPOINT,
}: ContactProps) {
  const reduceMotion = usePrefersReducedMotion();
  const links = buildLinks({ email, github, linkedin, instagram });
  const formRef = useRef<HTMLFormElement>(null);
  const isSubmittingRef = useRef(false);

  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isSubmittingRef.current) return;

      const formData = new FormData(event.currentTarget);
      const payload: ContactFormData = {
        name: String(formData.get("name") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        message: String(formData.get("message") ?? "").trim(),
        website: String(formData.get("_gotcha") ?? "").trim(),
      };

      const clientErrors = validateClient(payload);
      if (Object.keys(clientErrors).length > 0) {
        setFieldErrors(clientErrors);
        setStatus("error");
        setFeedback("Please fix the highlighted fields.");
        return;
      }

      setFieldErrors({});
      isSubmittingRef.current = true;
      setStatus("loading");
      setFeedback("");

      if (payload.website) {
        setStatus("error");
        setFeedback("Something went wrong. Please try again.");
        isSubmittingRef.current = false;
        return;
      }

      try {
        const result = await submitToFormspree(
          {
            name: payload.name,
            email: payload.email,
            message: payload.message,
            gotcha: payload.website,
          },
          formspreeUrl
        );

        if (!result.ok) {
          setStatus("error");
          setFeedback(result.message);
          return;
        }

        setStatus("success");
        setFeedback("Message sent successfully. I'll get back to you soon!");
        formRef.current?.reset();
      } catch {
        setStatus("error");
        setFeedback("Network error. Please check your connection and try again.");
      } finally {
        isSubmittingRef.current = false;
      }
    },
    [formspreeUrl]
  );

  const isLoading = status === "loading";
  const inputError = (field: keyof ContactFormData) =>
    fieldErrors[field]
      ? "border-red-300 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
      : "border-zinc-200/80";

  return (
    <section
      id="contact"
      className="contact-mesh relative w-full overflow-hidden border-t border-black/5"
    >
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.08)_0%,transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(24,24,27,0.06)_0%,transparent_70%)] blur-3xl" />
      <div className="hero-noise pointer-events-none absolute inset-0" />

      <div
        className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-10 sm:py-28"
        style={{ paddingBottom: "max(5rem, env(safe-area-inset-bottom))" }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start"
        >
          <motion.div variants={itemVariants}>
            <div className="max-w-lg">
              <span className="inline-flex items-center rounded-full border border-zinc-200/80 bg-white/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500 backdrop-blur-sm">
                Get in touch
              </span>
              <h2 className="mt-5 font-display text-3xl tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
                {subtitle}
              </p>
            </div>

            <nav
              className="mt-10 flex flex-col gap-3"
              aria-label="Social links"
            >
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={socialLinkClass}
                >
                  <span className={socialIconClass}>{link.icon}</span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      {link.label}
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-medium text-zinc-800 transition-colors group-hover:text-zinc-950">
                      {link.value}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900" />
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="glass-panel relative overflow-hidden rounded-3xl p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.18)] sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.12)_0%,transparent_70%)] blur-2xl" />

              <h3 className="relative text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl">
                Send a message
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-zinc-500">
                Fill out the form below and your message will be delivered directly
                to my inbox.
              </p>

              <AnimatePresence mode="wait">
                {(status === "success" || status === "error") && feedback && (
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative mt-6 flex items-start gap-3 overflow-hidden rounded-xl border px-4 py-3.5 ${
                      status === "success"
                        ? "border-emerald-200/80 bg-emerald-50/80 text-emerald-900"
                        : "border-red-200/80 bg-red-50/80 text-red-900"
                    }`}
                    role="alert"
                  >
                    {status === "success" ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                    )}
                    <p className="text-sm leading-relaxed">{feedback}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="relative mt-8 space-y-5"
              >
                {/* Formspree honeypot — must stay empty */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      disabled={isLoading}
                      placeholder="Your name"
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={
                        fieldErrors.name ? "contact-name-error" : undefined
                      }
                      className={`${inputBase} ${inputError("name")} disabled:cursor-not-allowed disabled:opacity-60`}
                    />
                    {fieldErrors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-1.5 text-xs text-red-600"
                      >
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      disabled={isLoading}
                      placeholder="you@email.com"
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={
                        fieldErrors.email ? "contact-email-error" : undefined
                      }
                      className={`${inputBase} ${inputError("email")} disabled:cursor-not-allowed disabled:opacity-60`}
                    />
                    {fieldErrors.email && (
                      <p
                        id="contact-email-error"
                        className="mt-1.5 text-xs text-red-600"
                      >
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    disabled={isLoading}
                    placeholder="Tell me about your project..."
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={
                      fieldErrors.message ? "contact-message-error" : undefined
                    }
                    className={`${inputBase} ${inputError("message")} resize-none disabled:cursor-not-allowed disabled:opacity-60`}
                  />
                  {fieldErrors.message && (
                    <p
                      id="contact-message-error"
                      className="mt-1.5 text-xs text-red-600"
                    >
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={
                    reduceMotion || isLoading ? undefined : { scale: 1.02 }
                  }
                  whileTap={
                    reduceMotion || isLoading ? undefined : { scale: 0.98 }
                  }
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-zinc-950 px-6 py-4 text-sm font-medium text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] transition-all duration-300 hover:shadow-[0_16px_48px_-10px_rgba(0,0,0,0.5)] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/25 to-red-600/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-disabled:opacity-0" />
                  {isLoading ? (
                    <Loader2 className="relative h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="relative h-4 w-4" strokeWidth={1.5} />
                  )}
                  <span className="relative">
                    {isLoading ? "Sending..." : "Send Message"}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
