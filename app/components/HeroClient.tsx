"use client";

import dynamic from "next/dynamic";

type HeroProps = {
  name?: string;
  highlight?: string;
  subtitle?: string;
};

const Hero = dynamic(() => import("./Hero"), {
  ssr: false,
});

export default function HeroClient(props: HeroProps) {
  return <Hero {...props} />;
}
