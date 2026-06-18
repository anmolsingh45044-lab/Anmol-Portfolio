import { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink, Github } from "lucide-react";
import { getRepos, type GithubRepo } from "../lib/api";
import { profile } from "../data/profile";
import Reveal from "./Reveal";

const LANG_COLOR: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572a5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  C: "#555555",
};

function RepoCard({ repo }: { repo: GithubRepo }) {
  const color = repo.language ? (LANG_COLOR[repo.language] ?? "#7d8a99") : "#7d8a99";
  return (
    <div className="flex flex-col h-full rounded-2xl border border-line bg-surface2 p-5 hover:border-accent/50 transition-colors group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-head font-semibold text-ink text-sm leading-tight break-all">
          {repo.name}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live demo"
              className="text-muted hover:text-accent2 transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            className="text-muted hover:text-accent transition-colors"
          >
            <Github size={14} />
          </a>
        </div>
      </div>

      <p className="text-xs text-muted leading-relaxed mb-4 flex-1">
        {repo.description ?? "No description provided."}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted mt-auto">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: color }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star size={11} /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork size={11} /> {repo.forks_count}
        </span>
      </div>
    </div>
  );
}

export default function Projects() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getRepos()
      .then((data) => setRepos(data.slice(0, 6)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="scroll-mt-20 max-w-6xl mx-auto px-5 sm:px-8 py-24">
      <Reveal>
        <p className="text-xs text-accent mb-2">~/projects</p>
        <h2 className="font-head font-bold text-3xl sm:text-4xl text-ink mb-2">
          Things I've built
        </h2>
        <p className="text-sm text-muted mb-12">
          Live from GitHub — most recently updated repos.
        </p>
      </Reveal>

      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-36 rounded-2xl border border-line bg-surface2 animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <Reveal>
          <div className="text-center py-16 border border-line rounded-2xl bg-surface2">
            <p className="text-muted text-sm mb-4">Couldn't load repos right now.</p>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              <Github size={14} /> Browse GitHub directly
            </a>
          </div>
        </Reveal>
      )}

      {!loading && !error && repos.length === 0 && (
        <Reveal>
          <div className="text-center py-16 border border-line rounded-2xl bg-surface2">
            <p className="text-muted text-sm mb-4">No public repos found yet.</p>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              <Github size={14} /> Visit GitHub profile
            </a>
          </div>
        </Reveal>
      )}

      {!loading && !error && repos.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo, i) => (
            <Reveal key={repo.id} delay={i * 70}>
              <RepoCard repo={repo} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal delay={200}>
        <div className="mt-10 text-center">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm border border-line rounded-full px-5 py-2.5 text-muted hover:border-accent hover:text-accent transition-colors"
          >
            <Github size={14} /> See all on GitHub
          </a>
        </div>
      </Reveal>
    </section>
  );
}
