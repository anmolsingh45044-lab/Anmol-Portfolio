import { useState } from "react";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const isAdminRoute = new URLSearchParams(window.location.search).has("admin");

type AuthState = { token: string; username: string } | null;

function getStoredAuth(): AuthState {
  try {
    const raw = localStorage.getItem("admin_auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function AdminApp() {
  const [auth, setAuth] = useState<AuthState>(getStoredAuth);

  function handleLogin(token: string, username: string) {
    const state = { token, username };
    localStorage.setItem("admin_auth", JSON.stringify(state));
    setAuth(state);
  }

  function handleLogout() {
    localStorage.removeItem("admin_auth");
    setAuth(null);
  }

  if (!auth) return <AdminLogin onLogin={handleLogin} />;
  return <AdminDashboard token={auth.token} username={auth.username} onLogout={handleLogout} />;
}

export default function App() {
  if (isAdminRoute) return <AdminApp />;
  return <Home />;
}
