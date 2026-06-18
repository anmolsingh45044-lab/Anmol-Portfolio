import { profile } from "../data/profile";

export const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "");
export const hasBackend = Boolean(API_URL);

export type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  updated_at: string;
};

// ---- Projects (GitHub repos) ------------------------------------------

export async function getRepos(): Promise<GithubRepo[]> {
  if (hasBackend) {
    try {
      const res = await fetch(`${API_URL}/github`);
      if (res.ok) {
        const data = await res.json();
        return data.repos ?? [];
      }
    } catch {
      // fall through to direct GitHub call
    }
  }
  const res = await fetch(
    `https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=6`
  );
  if (!res.ok) throw new Error("GitHub API unavailable");
  const repos: GithubRepo[] = await res.json();
  return repos.filter((r: any) => !r.fork);
}

// ---- Contact form -------------------------------------------------------

export type ContactPayload = { name: string; email: string; message: string };

export async function submitContact(
  payload: ContactPayload
): Promise<{ ok: true; mode: "api" | "mailto" } | { ok: false; error: string }> {
  if (hasBackend) {
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) return { ok: true, mode: "api" };
      return { ok: false, error: data.errors?.join(", ") || data.error || "Something went wrong" };
    } catch {
      return { ok: false, error: "Couldn't reach the server — try the email link below instead" };
    }
  }
  const subject = encodeURIComponent(`Portfolio message from ${payload.name}`);
  const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`);
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  return { ok: true, mode: "mailto" };
}

// ---- Admin ---------------------------------------------------------------

export type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export type StatsDay = { date: string; visits: number; messages: number };

export async function adminLogin(username: string, password: string) {
  if (!hasBackend) throw new Error("No backend configured. Set VITE_API_URL to enable the admin dashboard.");
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data as { token: string; username: string };
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export async function getMessages(token: string): Promise<ContactMessage[]> {
  const res = await fetch(`${API_URL}/contact`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error("Could not load messages");
  return res.json();
}

export async function markMessageRead(token: string, id: string) {
  await fetch(`${API_URL}/contact/${id}/read`, { method: "PATCH", headers: authHeaders(token) });
}

export async function deleteMessage(token: string, id: string) {
  await fetch(`${API_URL}/contact/${id}`, { method: "DELETE", headers: authHeaders(token) });
}

export async function getStats(token: string): Promise<StatsDay[]> {
  const res = await fetch(`${API_URL}/stats`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error("Could not load stats");
  return res.json();
}
