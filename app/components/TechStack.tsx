"use client";

import { motion } from "framer-motion";

type Tech = {
  label: string;
  icon: string;
};

function Icon({ src }: { src: string }) {
  return (
    <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-50/50 ring-1 ring-black/5 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:ring-black/10 group-hover:shadow-lg group-focus:scale-110 group-focus:bg-white group-focus:ring-black/10 group-focus:shadow-lg">
      <img
        src={src}
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 object-contain"
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = "none";
        }}
      />
    </span>
  );
}

function Mark({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-[rgb(var(--accent-1)/1)] to-[rgb(var(--accent-2)/1)] bg-clip-text text-transparent">
      {children}
    </span>
  );
}

const techs: Tech[] = [
  // ========================================
  // FRONTEND - 8
  // ========================================
  {
    label: "HTML5",
    icon: "https://cdn.simpleicons.org/html5/E34F26",
  },
  {
    label: "CSS",
    icon: "https://cdn.simpleicons.org/css/663399",
  },
  {
    label: "JavaScript",
    icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
  },
  {
    label: "Next.js",
    icon: "https://cdn.simpleicons.org/nextdotjs/000000",
  },
  {
    label: "Lucide React",
    icon: "https://cdn.simpleicons.org/lucide/61DAFB",
  },
  {
    label: "React",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
  },
  {
    label: "Tailwind CSS",
    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  },
  {
    label: "Bootstrap",
    icon: "https://cdn.simpleicons.org/bootstrap/7952B3",
  },

  // ========================================
  // BACKEND & DATABASE - 8
  // ========================================
  {
    label: "Laravel",
    icon: "https://cdn.simpleicons.org/laravel/FF2D20",
  },
  {
    label: "PHP",
    icon: "https://cdn.simpleicons.org/php/777BB4",
  },
  {
    label: "MySQL",
    icon: "https://cdn.simpleicons.org/mysql/4479A1",
  },
  {
    label: "PostgreSQL",
    icon: "https://cdn.simpleicons.org/postgresql/4169E1",
  },
  {
    label: "MongoDB",
    icon: "https://cdn.simpleicons.org/mongodb/47A248",
  },
  {
    label: "Node.js",
    icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
  },
  {
    label: "Go",
    icon: "https://cdn.simpleicons.org/go/00ADD8",
  },
  {
    label: "Supabase",
    icon: "https://cdn.simpleicons.org/supabase/3ECF8E",
  },

  // ========================================
  // TOOLS - 8
  // ========================================
  {
    label: "Git",
    icon: "https://cdn.simpleicons.org/git/F05032",
  },
  {
    label: "GitHub",
    icon: "https://cdn.simpleicons.org/github/181717",
  },
  {
    label: "Figma",
    icon: "https://cdn.simpleicons.org/figma/F24E1E",
  },
  {
    label: "Vercel",
    icon: "https://cdn.simpleicons.org/vercel/000000",
  },
  {
    label: "Postman",
    icon: "https://cdn.simpleicons.org/postman/FF6C37",
  },
  {
    label: "Ubuntu",
    icon: "https://cdn.simpleicons.org/ubuntu/E95420",
  },
  {
    label: "Linux",
    icon: "https://cdn.simpleicons.org/linux/FCC624",
  },
  {
    label: "Docker",
    icon: "https://cdn.simpleicons.org/docker/2496ED",
  },
];

export default function TechStack() {
  const reduceMotion = false;

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  } as const;

  const item = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
      filter: "blur(4px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } as const;

  const frontend = techs.slice(0, 8);
  const backend = techs.slice(8, 16);
  const tools = techs.slice(17, 24);

  return (
    <section
      id="techstack"
      className="relative w-full overflow-hidden border-t border-black/5"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        {/* ========================================
            HEADER
        ======================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 14,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Tech <Mark>Stack</Mark>
          </h2>

          <p className="mt-4 text-pretty text-sm leading-7 tracking-tight text-zinc-600 sm:text-base">
            Tools I use to build fast, clean, and maintainable products.
          </p>
        </motion.div>

        {/* ========================================
            FRONTEND
        ======================================== */}
        <div className="mx-auto mt-16 max-w-5xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center"
          >
            <h3 className="mb-8 text-xl font-semibold tracking-tight text-zinc-950">
              Frontend
            </h3>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              margin: "-20% 0px -20% 0px",
            }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-8 sm:gap-x-10 sm:gap-y-9"
          >
            {frontend.map((tech) => (
              <motion.div
                key={tech.label}
                variants={item}
                tabIndex={0}
                className="group flex w-20 flex-col items-center gap-3 outline-none"
              >
                <Icon src={tech.icon} />

                <span className="whitespace-nowrap text-xs font-medium tracking-tight text-zinc-500 transition-colors duration-300 group-hover:text-zinc-950 group-focus:text-zinc-950">
                  {tech.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ========================================
            BACKEND & DATABASE
        ======================================== */}
        <div className="mx-auto mt-16 max-w-5xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center"
          >
            <h3 className="mb-8 text-xl font-semibold tracking-tight text-zinc-950">
              Backend & Database
            </h3>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              margin: "-20% 0px -20% 0px",
            }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-8 sm:gap-x-10 sm:gap-y-9"
          >
            {backend.map((tech) => (
              <motion.div
                key={tech.label}
                variants={item}
                tabIndex={0}
                className="group flex w-20 flex-col items-center gap-3 outline-none"
              >
                <Icon src={tech.icon} />

                <span className="whitespace-nowrap text-xs font-medium tracking-tight text-zinc-500 transition-colors duration-300 group-hover:text-zinc-950 group-focus:text-zinc-950">
                  {tech.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ========================================
            TOOLS
        ======================================== */}
        <div className="mx-auto mt-16 max-w-5xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center"
          >
            <h3 className="mb-8 text-xl font-semibold tracking-tight text-zinc-950">
              Tools
            </h3>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              margin: "-20% 0px -20% 0px",
            }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-8 sm:gap-x-10 sm:gap-y-9"
          >
            {tools.map((tech) => (
              <motion.div
                key={tech.label}
                variants={item}
                tabIndex={0}
                className="group flex w-20 flex-col items-center gap-3 outline-none"
              >
                <Icon src={tech.icon} />

                <span className="whitespace-nowrap text-xs font-medium tracking-tight text-zinc-500 transition-colors duration-300 group-hover:text-zinc-950 group-focus:text-zinc-950">
                  {tech.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}