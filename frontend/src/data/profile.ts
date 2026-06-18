// Everything on the site is derived from this file by default. If a backend
// is configured (VITE_API_URL), some sections will prefer live API data —
// but the site renders correctly with just this.

export const profile = {
  name: "Anmol Singh",
  initials: "AS",
  title: "Full Stack Developer & AI/ML Engineer",
  location: "Ghaziabad, Uttar Pradesh, India — 201001",
  email: "anmolsingh45044@gmail.com",
  phone: "+91 90458 60031",
  githubUser: "anmolsingh45044-lab",
  githubUrl: "https://github.com/anmolsingh45044-lab",
  availability: "Open to full-stack & AI/ML internship roles",
  bio: [
    "I build full-stack web applications end to end — from React interfaces down to the Node/Express APIs and MongoDB schemas behind them — and I'm steadily widening that stack into AI and machine learning.",
    "I'm finishing a BCA with a specialization in Artificial Intelligence, where I'm part of the Data Analytics Club, and I recently completed a short full-stack internship building responsive interfaces and REST APIs for an early-stage start-up.",
    "Right now I'm deepening my Python, pandas/NumPy and machine-learning fundamentals while picking up generative AI — this portfolio itself (React/Vite frontend, Express/MongoDB backend, JWT-secured admin) is one of the things I built along the way.",
  ],
  languages: [{ name: "English", level: "Upper Intermediate (B2)" }],
};

export type SkillGroup = {
  id: string;
  label: string;
  accent: "accent" | "accent2" | "accent3";
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  { id: "frontend", label: "Frontend",            accent: "accent2", items: ["HTML", "CSS", "JavaScript", "React"] },
  { id: "backend",  label: "Backend & Data",       accent: "accent",  items: ["Node.js", "Express", "MongoDB", "REST APIs"] },
  { id: "core",     label: "Core Languages",       accent: "accent3", items: ["Java (OOP)", "Python", "C"] },
  { id: "ai",       label: "AI & Machine Learning", accent: "accent3", items: ["Pandas", "NumPy", "Machine Learning", "Generative AI (learning)"] },
];

export type TimelineType = "work" | "edu" | "cert";
export type TimelineItem = {
  type: TimelineType;
  date: string;
  title: string;
  org: string;
  points?: string[];
};

export const timeline: TimelineItem[] = [
  {
    type: "work",
    date: "Nov 2025 – Dec 2025",
    title: "Full Stack Developer Intern",
    org: "Early-stage Start-up · Ghaziabad",
    points: [
      "Built responsive web interfaces with HTML, CSS and JavaScript frameworks",
      "Assisted with database management and implemented RESTful APIs",
      "Collaborated with the team to troubleshoot issues and ship fixes",
      "Took part in code reviews to keep code aligned with team standards",
    ],
  },
  {
    type: "cert",
    date: "Apr 2026",
    title: "Data Analytics Workshop",
    org: "Professional development",
  },
  {
    type: "edu",
    date: "Expected Jun 2026",
    title: "BCA — Artificial Intelligence",
    org: "IMS Ghaziabad, Uttar Pradesh",
    points: [
      "Member, Data Analytics Club",
      "Coursework focus: AI & Machine Learning",
      "Completed professional development in Python",
    ],
  },
  {
    type: "cert",
    date: "Oct 2026 (expected)",
    title: "Internet of Things",
    org: "IIT Kanpur",
  },
];
