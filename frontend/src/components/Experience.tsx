import { Briefcase, GraduationCap, Award } from "lucide-react";
import { timeline, type TimelineType } from "../data/profile";
import Reveal from "./Reveal";

const DOT: Record<TimelineType, string> = {
  work: "bg-accent2",
  edu: "bg-accent",
  cert: "bg-accent3",
};
const RING: Record<TimelineType, string> = {
  work: "ring-accent2/30",
  edu: "ring-accent/30",
  cert: "ring-accent3/30",
};
const ICON: Record<TimelineType, typeof Briefcase> = {
  work: Briefcase,
  edu: GraduationCap,
  cert: Award,
};
const LABEL: Record<TimelineType, string> = {
  work: "Work",
  edu: "Education",
  cert: "Certification",
};

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 max-w-4xl mx-auto px-5 sm:px-8 py-24">
      <Reveal>
        <p className="text-xs text-accent mb-2">~/experience</p>
        <h2 className="font-head font-bold text-3xl sm:text-4xl text-ink mb-12">
          Where I've been
        </h2>
      </Reveal>

      <ol className="relative border-l border-line ml-3">
        {timeline.map((entry, i) => {
          const Icon = ICON[entry.type];
          return (
            <Reveal key={i} delay={i * 90}>
              <li className="relative pl-8 pb-12 last:pb-0">
                <span
                  className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ring-4 ${RING[entry.type]} ${DOT[entry.type]}`}
                />
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono text-muted">{entry.date}</span>
                  <span className="text-[10px] uppercase tracking-wide text-ink/60 border border-line rounded-full px-2 py-0.5 flex items-center gap-1">
                    <Icon size={10} /> {LABEL[entry.type]}
                  </span>
                </div>
                <h3 className="font-head font-semibold text-lg text-ink mb-0.5">{entry.title}</h3>
                <p className="text-sm text-muted mb-3">{entry.org}</p>
                {entry.points && (
                  <ul className="space-y-1.5">
                    {entry.points.map((p, j) => (
                      <li key={j} className="text-sm text-ink/80 leading-relaxed flex gap-2">
                        <span className="text-accent shrink-0">›</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
