import type { Config } from "tailwindcss";

export default {
  content:  ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent:   "#00e5a0",
        accent2:  "#38bdf8",
        accent3:  "#a78bfa",
        surface:  "#111820",
        surface2: "#161f2b",
        ink:      "#e7edf3",
        muted:    "#7d8a99",
        line:     "#22303d",
      },
      fontFamily: {
        head:  ["Syne", "sans-serif"],
        body:  ["DM Mono", "monospace"],
        serif: ["Fraunces", "serif"],
      },
      animation: {
        "fade-up":    "fadeUp .65s cubic-bezier(.16,1,.3,1) both",
        "float":      "float 4s ease-in-out infinite",
        "grad-shift": "gradShift 4s ease infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
