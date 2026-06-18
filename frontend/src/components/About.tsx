import { profile } from "../data/profile";
import Reveal from "./Reveal";

const INFO_ROWS: Array<[string, string]> = [
  ["location", profile.location],
  ["role", "Full Stack Dev · AI/ML"],
  ["education", "BCA (AI) — expected 2026"],
  ["languages", profile.languages.map((l) => `${l.name} (${l.level})`).join(", ")],
  ["status", profile.availability],
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <Reveal>
        <p className="text-xs text-accent mb-2">~/about</p>
        <h2 className="font-head font-bold text-3xl sm:text-4xl text-ink mb-12">
          A little about me
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <Reveal className="space-y-5">
          {profile.bio.map((p, i) => (
            <p key={i} className="text-sm sm:text-[15px] text-muted leading-relaxed">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-2xl border border-line bg-surface2 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-line">
              <span className="w-2.5 h-2.5 rounded-full bg-accent3/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent2/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
              <span className="ml-2 text-xs text-muted">system-info.json</span>
            </div>
            <div className="p-5 sm:p-6 text-sm space-y-3">
              {INFO_ROWS.map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <span className="text-accent3 shrink-0">{k}:</span>
                  <span className="text-ink/90 break-words">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
