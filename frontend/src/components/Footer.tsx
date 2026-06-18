import { Mail, Github } from "lucide-react";
import { profile } from "../data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line mt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
        <p>
          © {year} {profile.name} · Built with React + Vite + Tailwind
        </p>

        <div className="flex items-center gap-5">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-accent transition-colors"
          >
            <Github size={15} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="hover:text-accent transition-colors"
          >
            <Mail size={15} />
          </a>
          {/* discreet admin access — not shown in nav */}
          <a
            href="?admin=true"
            className="opacity-30 hover:opacity-70 transition-opacity"
            aria-label="Admin"
          >
            ⚙
          </a>
        </div>
      </div>
    </footer>
  );
}
