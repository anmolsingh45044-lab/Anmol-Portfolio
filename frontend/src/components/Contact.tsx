import { useState } from "react";
import { Mail, Phone, MapPin, Github, Send, CheckCircle, AlertCircle } from "lucide-react";
import { profile } from "../data/profile";
import { submitContact, hasBackend } from "../lib/api";
import Reveal from "./Reveal";

const LINKS = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: profile.location.split(",").slice(0, 2).join(", "), href: null },
  { icon: Github, label: `github.com/${profile.githubUser}`, href: profile.githubUrl },
];

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus("sending");
    const res = await submitContact({ name: name.trim(), email: email.trim(), message: message.trim() });
    if (res.ok) {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setErrMsg((res as any).error ?? "Something went wrong. Try emailing directly.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <Reveal>
        <p className="text-xs text-accent mb-2">~/contact</p>
        <h2 className="font-head font-bold text-3xl sm:text-4xl text-ink mb-3">
          Let's talk
        </h2>
        <p className="text-sm text-muted mb-12 max-w-md">
          Open to full-stack and AI/ML internship opportunities — drop me a message or reach out directly.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Contact info */}
        <Reveal className="space-y-3">
          {LINKS.map(({ icon: Icon, label, href }) => (
            <div key={label} className="flex items-center gap-3 text-sm">
              <span className="w-8 h-8 rounded-lg border border-line bg-surface2 flex items-center justify-center text-accent shrink-0">
                <Icon size={14} />
              </span>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-ink hover:text-accent2 transition-colors break-all"
                >
                  {label}
                </a>
              ) : (
                <span className="text-muted">{label}</span>
              )}
            </div>
          ))}
        </Reveal>

        {/* Form */}
        <Reveal delay={120}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted mb-1.5">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Anmol Singh"
                  className="w-full text-sm bg-surface2 border border-line rounded-xl px-4 py-2.5 text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full text-sm bg-surface2 border border-line rounded-xl px-4 py-2.5 text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted mb-1.5">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="Hi Anmol, I'd love to chat about..."
                className="w-full text-sm bg-surface2 border border-line rounded-xl px-4 py-2.5 text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            {!hasBackend && (
              <p className="text-xs text-muted">
                No backend configured — submitting will open your mail client.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 bg-accent text-surface text-sm font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              <Send size={14} />
              {status === "sending" ? "Sending…" : "Send message"}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-accent">
                <CheckCircle size={15} /> Message sent — I'll get back to you soon!
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={15} /> {errMsg}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
