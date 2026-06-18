import { useEffect, useState } from "react";
import {
  LogOut, Mail, MailOpen, Trash2, TrendingUp, MessageSquare, RefreshCw,
} from "lucide-react";
import {
  getMessages, markMessageRead, deleteMessage, getStats,
  type ContactMessage, type StatsDay,
} from "../../lib/api";
import { profile } from "../../data/profile";

interface Props {
  token: string;
  username: string;
  onLogout: () => void;
}

export default function AdminDashboard({ token, username, onLogout }: Props) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<StatsDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [msgs, st] = await Promise.all([getMessages(token), getStats(token)]);
      setMessages(msgs);
      setStats(st.slice(-7)); // last 7 days
    } catch (err: any) {
      const msg: string = err.message ?? "";
      if (msg.includes("401") || msg.toLowerCase().includes("unauthorized")) {
        onLogout(); // token expired
      } else {
        setError("Failed to load data. Check your connection.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleRead(id: string) {
    await markMessageRead(token, id);
    setMessages((prev) => prev.map((m) => m._id === id ? { ...m, read: true } : m));
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    await deleteMessage(token, id);
    setMessages((prev) => prev.filter((m) => m._id !== id));
  }

  const totalVisits = stats.reduce((s, d) => s + d.visits, 0);
  const totalMessages = stats.reduce((s, d) => s + d.messages, 0);
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-surface px-5 sm:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-head font-bold text-xl gradient-text">{profile.initials}.</p>
            <p className="text-xs text-muted mt-0.5">Signed in as <span className="text-ink">{username}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={load}
              title="Refresh"
              className="w-8 h-8 rounded-lg border border-line text-muted hover:text-accent hover:border-accent transition-colors flex items-center justify-center"
            >
              <RefreshCw size={13} />
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-xs border border-line rounded-full px-4 py-2 text-muted hover:border-red-400 hover:text-red-400 transition-colors"
            >
              <LogOut size={13} /> Sign out
            </button>
          </div>
        </div>

        {loading && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 rounded-2xl border border-line bg-surface2 animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-400/30 bg-red-400/5 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { icon: TrendingUp, label: "Visits (7d)", value: totalVisits, color: "text-accent2" },
                { icon: MessageSquare, label: "Msgs (7d)", value: totalMessages, color: "text-accent" },
                { icon: Mail, label: "Unread", value: unread, color: "text-accent3" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="rounded-2xl border border-line bg-surface2 p-4 sm:p-5 flex flex-col gap-1">
                  <Icon size={15} className={color} />
                  <p className="text-xl font-head font-bold text-ink">{value}</p>
                  <p className="text-xs text-muted">{label}</p>
                </div>
              ))}
            </div>

            {/* Messages */}
            <div>
              <h2 className="font-head font-semibold text-ink text-base mb-4">
                Messages
                {unread > 0 && (
                  <span className="ml-2 text-xs bg-accent3/20 text-accent3 rounded-full px-2 py-0.5">
                    {unread} unread
                  </span>
                )}
              </h2>

              {messages.length === 0 ? (
                <p className="text-sm text-muted text-center py-16 border border-line rounded-2xl bg-surface2">
                  No messages yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`rounded-2xl border bg-surface2 p-5 ${
                        msg.read ? "border-line" : "border-accent3/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="font-head font-semibold text-sm text-ink">
                            {msg.name}
                          </span>
                          <span className="text-muted text-xs ml-2">{msg.email}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {!msg.read && (
                            <button
                              onClick={() => handleRead(msg._id)}
                              title="Mark as read"
                              className="text-muted hover:text-accent transition-colors"
                            >
                              <MailOpen size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(msg._id)}
                            title="Delete"
                            className="text-muted hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-ink/80 leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                      </p>
                      <p className="text-xs text-muted mt-2">
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
