"use client";

import { motion } from "framer-motion";
import ProfileCard from "../../components/ProfileCard";

type AboutProps = {
  title?: string;
  paragraph?: string;
  name?: string;
};

export default function About({
  title = "About Me",
  paragraph = "I’m a Full Stack Developer who enjoys turning ideas into modern, high-performance web applications. I care about clean architecture, responsive UI, reliable backend systems, and details that make products feel polished—balancing performance, maintainability, and a great user experience.",
  name = "Fawwaz Hirogest | Fullstack Developer"
}: AboutProps) {
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
          >
            {/* <ProfileCard
              avatarUrl="/image/profile.png"
              miniAvatarUrl="/image/profile.png"
              name="Fawwaz Hirogest Putra Andaya"
              title="Fullstack Developer"
              handle="hirogest23"
              status="Portfolio"
              statusColor="#00ff00"
              contactText="Email me"
              onContactClick={() => {
                window.location.href = "mailto:hirogest23@gmail.com";
              }}
              className="mx-auto"
            /> */}
            <ProfileCard/>
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
