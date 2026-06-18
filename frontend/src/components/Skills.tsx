import { skillGroups } from "../data/profile";
import Reveal from "./Reveal";

const BORDER: Record<string, string> = {
  accent: "border-t-accent",
  accent2: "border-t-accent2",
  accent3: "border-t-accent3",
};
const TEXT: Record<string, string> = {
  accent: "text-accent",
  accent2: "text-accent2",
  accent3: "text-accent3",
};

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <Reveal>
        <p className="text-xs text-accent mb-2">~/skills</p>
        <h2 className="font-head font-bold text-3xl sm:text-4xl text-ink mb-12">
          Tools I work with
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} delay={i * 90}>
            <div
              className={`h-full rounded-2xl border border-line border-t-2 ${BORDER[group.accent]} bg-surface2 p-5`}
            >
              <h3 className={`font-head font-semibold text-sm mb-4 ${TEXT[group.accent]}`}>
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs text-ink/85 border border-line rounded-full px-3 py-1.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
