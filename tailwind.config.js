/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "outer-bg": "#8C8C72",
        "app-shell-bg": "#F2F0EA",
        "card-bg": "#FAFAF8",
        "sidebar-bg": "#FFFFFF",
        "accent-primary": "#3D3C2E",
        "accent-secondary": "#C8C4A8",
        "body-text": "#2A2A1E",
        "muted-text": "#8A8A72",
        divider: "#E8E4D8",
        success: "#5C7A5C",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        "serif-display": ["var(--font-dm-serif)", "serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.07)",
        "card-strong": "0 2px 8px rgba(0,0,0,0.08)",
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
