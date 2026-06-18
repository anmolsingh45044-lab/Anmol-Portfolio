import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "../data/profile";

const LINKS = [
  { href: "#about",      label: "~/about" },
  { href: "#skills",     label: "~/skills" },
  { href: "#experience", label: "~/experience" },
  { href: "#projects",   label: "~/projects" },
  { href: "#contact",    label: "~/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-surface/90 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-head font-extrabold text-lg tracking-tight">
          <span className="gradient-text">{profile.initials}</span>
          <span className="text-muted">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-7 text-sm">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-muted hover:text-accent transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 text-xs border border-line rounded-full px-4 py-2 text-muted hover:border-accent hover:text-accent transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {profile.availability}
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-ink"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-line bg-surface px-5 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
