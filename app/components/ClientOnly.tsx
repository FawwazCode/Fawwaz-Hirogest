"use client";

import { useIsClient } from "@/app/hooks/useIsClient";

type ClientOnlyProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

/** Renders children only after hydration to avoid SSR/client markup mismatches. */
export default function ClientOnly({
  children,
  fallback = null,
}: ClientOnlyProps) {
  const isClient = useIsClient();
  if (!isClient) return fallback;
  return children;
}
