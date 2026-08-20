"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#techstack", label: "Tech Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#certificate", label: "Certificate" },
  { href: "#contact", label: "Contact" },
] as const;

type NavLinkProps = {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
};

function NavLink({ href, label, onClick, className = "" }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 ${className}`}
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-zinc-950 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 group-active:scale-x-100" />
    </a>
  );
}

function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="mobile-nav-menu"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-zinc-900 transition-colors hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 sm:hidden"
    >
      <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      <span className="relative flex h-5 w-6 flex-col items-center justify-center">
        <motion.span
          animate={
            isOpen
              ? { rotate: 45, y: 0, width: 24 }
              : { rotate: 0, y: -7, width: 24 }
          }
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute block h-[2px] rounded-full bg-zinc-900"
          style={{ width: 24 }}
        />
        <motion.span
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute block h-[2px] w-6 rounded-full bg-zinc-900"
        />
        <motion.span
          animate={
            isOpen
              ? { rotate: -45, y: 0, width: 24 }
              : { rotate: 0, y: 7, width: 24 }
          }
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute block h-[2px] rounded-full bg-zinc-900"
          style={{ width: 24 }}
        />
      </span>
    </button>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const scrollY = window.scrollY;
    const { style } = document.body;

    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      style.overflow = "";
      style.position = "";
      style.top = "";
      style.left = "";
      style.right = "";
      style.width = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 flex w-full max-w-[100vw] items-center justify-between gap-4 border-b border-black/5 bg-white/70 px-4 py-3 backdrop-blur-md sm:px-10 sm:py-6 ${isMenuOpen ? "z-[130]" : "z-[100]"}`}
        style={{
          paddingTop: "max(0.75rem, env(safe-area-inset-top))",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        <div className="min-w-0 flex-1 text-left text-sm font-medium text-zinc-900 sm:flex-none">
          <span className="block truncate sm:whitespace-normal">
            Fawwaz Hirogest Putra Andaya
          </span>
        </div>

        <nav
          aria-label="Main navigation"
          className="hidden items-center justify-end gap-8 text-sm font-medium text-zinc-800 sm:flex"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              className="hover:text-zinc-950"
            />
          ))}
        </nav>

        <HamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.button
              key="mobile-nav-overlay"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={closeMenu}
              aria-label="Close menu overlay"
              className="fixed inset-0 z-[110] touch-none bg-black/40 backdrop-blur-[2px] sm:hidden"
            />

            <motion.nav
              key="mobile-nav-drawer"
              id="mobile-nav-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Mobile navigation"
              className="fixed top-0 right-0 z-[120] flex h-[100dvh] w-[min(85vw,320px)] flex-col overflow-y-auto overscroll-contain border-l border-black/5 bg-white/95 shadow-2xl backdrop-blur-xl sm:hidden"
              style={{
                paddingTop: "max(5rem, calc(env(safe-area-inset-top) + 4rem))",
                paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
                paddingRight: "max(1.5rem, env(safe-area-inset-right))",
              }}
            >
              <ul className="flex flex-col gap-1 px-6">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.05 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <NavLink
                      href={link.href}
                      label={link.label}
                      onClick={closeMenu}
                      className="block rounded-lg px-3 py-4 text-lg font-medium text-zinc-800 hover:bg-zinc-50 hover:text-zinc-950 active:bg-zinc-100"
                    />
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
