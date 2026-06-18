import { useState } from "react";
import { LogIn, AlertCircle } from "lucide-react";
import { adminLogin, hasBackend } from "../../lib/api";
import { profile } from "../../data/profile";

interface Props {
  onLogin: (token: string, username: string) => void;
}

export default function AdminLogin({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!hasBackend) return;
    setError("");
    setLoading(true);
    try {
      const data = await adminLogin(username, password);
      onLogin(data.token, data.username);
    } catch (err: any) {
      setError(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-surface">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-head font-bold text-2xl gradient-text mb-1">{profile.initials}.</p>
          <h1 className="font-head font-semibold text-xl text-ink">Admin Dashboard</h1>
          <p className="text-xs text-muted mt-1">Portfolio management</p>
        </div>

        {!hasBackend ? (
          <div className="rounded-2xl border border-line bg-surface2 p-6 text-center">
            <AlertCircle size={24} className="text-muted mx-auto mb-3" />
            <p className="text-sm text-muted">
              No backend configured. Set <code className="text-accent text-xs">VITE_API_URL</code>{" "}
              at build time to enable the admin dashboard.
            </p>
            <a href="/" className="mt-4 inline-block text-xs text-accent hover:underline">
              ← Back to site
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-line bg-surface2 p-6 space-y-4"
          >
            <div>
              <label className="block text-xs text-muted mb-1.5">Username</label>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full text-sm bg-surface border border-line rounded-xl px-4 py-2.5 text-ink focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1.5">Password</label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-sm bg-surface border border-line rounded-xl px-4 py-2.5 text-ink focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {error && (
              <p className="flex items-center gap-2 text-xs text-red-400">
                <AlertCircle size={13} /> {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-accent text-surface text-sm font-medium py-2.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              <LogIn size={14} /> {loading ? "Signing in…" : "Sign in"}
            </button>

            <p className="text-center">
              <a href="/" className="text-xs text-muted hover:text-accent transition-colors">
                ← Back to site
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
