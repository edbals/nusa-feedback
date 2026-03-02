/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "outer-bg": "#07091A",
        "app-shell-bg": "#07091A",
        "card-bg": "#0D1526",
        "hero-card-bg": "#0F2044",
        "sidebar-bg": "#0A1020",
        "accent-primary": "#00C8FF",
        "accent-secondary": "#7B61FF",
        "body-text": "#FFFFFF",
        "muted-text": "#94A3B8",
        divider: "rgba(255,255,255,0.07)",
        success: "#00C8FF",
        "badge-red": "#DC2626",
        "badge-amber": "#D97706",
        "badge-olive": "#7A8C00",
      },
      fontFamily: {
        sans: ["'TT Interphases'", "var(--font-inter)", "system-ui", "sans-serif"],
        "serif-display": ["'TT Interphases Mono'", "'Courier New'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.07)",
        "card-strong": "0 0 0 1.5px #00C8FF, 0 4px 24px rgba(0,200,255,0.12)",
        "cyan-glow": "0 0 32px rgba(0,200,255,0.15)",
      },
      animation: {
        "fade-in": "fadeIn 200ms ease forwards",
        "stagger-fade": "fadeInUp 260ms ease forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
