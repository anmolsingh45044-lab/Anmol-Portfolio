import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 pt-16 overflow-hidden"
    >
      {/* ambient floating accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-accent/10 blur-3xl animate-float" />
        <div
          className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-accent3/10 blur-3xl animate-float"
          style={{ animationDelay: "1.2s" }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-3xl text-center"
      >
        <motion.p
          variants={item}
          className="text-sm text-accent flex items-center justify-center gap-2 mb-6"
        >
          <span>$ whoami</span>
          <span className="inline-block w-[7px] h-[16px] bg-accent animate-pulse" />
        </motion.p>

        <motion.h1
          variants={item}
          className="font-head font-extrabold leading-[0.95] text-5xl sm:text-7xl gradient-text animate-grad-shift mb-4"
        >
          {profile.name}
        </motion.h1>

        <motion.p variants={item} className="font-serif italic text-xl sm:text-2xl text-ink/90 mb-6">
          {profile.title}
        </motion.p>

        <motion.p variants={item} className="text-sm text-muted leading-relaxed max-w-xl mx-auto mb-10">
          {profile.bio[0]}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-accent text-surface font-medium text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            View my work <ArrowUpRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-line text-ink text-sm px-6 py-3 rounded-full hover:border-accent2 hover:text-accent2 transition-colors"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted"
        >
          <span>📍 {profile.location.split(",").slice(0, 2).join(",")}</span>
          <span>🎓 BCA · AI, Expected 2026</span>
          <span>🌐 English (B2)</span>
        </motion.div>
      </motion.div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 text-muted hover:text-accent animate-float"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
