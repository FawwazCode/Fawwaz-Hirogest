"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsClient } from "@/app/hooks/useIsClient";
import OpeningScreen from "./OpeningScreen";

type HomeShellProps = {
  children: React.ReactNode;
};

/** Static shell — must match server HTML during hydration. */
function OpeningPlaceholder() {
  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#030303]"
      aria-hidden
    />
  );
}

export default function HomeShell({ children }: HomeShellProps) {
  const isClient = useIsClient();
  const [isOpening, setIsOpening] = useState(true);

  useEffect(() => {
    if (!isClient) return;

    if (isOpening) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpening, isClient]);

  if (!isClient) {
    return <OpeningPlaceholder />;
  }

  if (isOpening) {
    return <OpeningScreen onComplete={() => setIsOpening(false)} />;
  }

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
