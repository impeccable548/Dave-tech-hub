import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#D4AF37", // primary gold
          600: "#B8960C",
          700: "#92700A",
          800: "#6B5007",
          900: "#3D2E04",
        },
        noir: {
          50:  "#1a1a1a",
          100: "#141414",
          200: "#0f0f0f",
          300: "#0a0a0a",
          400: "#050505",
          500: "#000000",
        },
        silver: {
          100: "#f5f5f5",
          200: "#e0e0e0",
          300: "#c0c0c0",
          400: "#a0a0a0",
          500: "#808080",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body:    ["'DM Sans'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "gold-gradient":   "linear-gradient(135deg, #D4AF37 0%, #f5f0e8 50%, #D4AF37 100%)",
        "noir-gradient":   "linear-gradient(180deg, #000000 0%, #0f0f0f 100%)",
        "hero-gradient":   "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.15) 0%, transparent 70%)",
        "card-gradient":   "linear-gradient(145deg, rgba(212,175,55,0.08) 0%, rgba(0,0,0,0.6) 100%)",
      },
      boxShadow: {
        gold:      "0 0 20px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.1)",
        "gold-lg": "0 0 40px rgba(212,175,55,0.5), 0 0 100px rgba(212,175,55,0.2)",
        "gold-sm": "0 0 10px rgba(212,175,55,0.3)",
        glass:     "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.1)",
      },
      animation: {
        "float":       "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out 2s infinite",
        "shimmer":     "shimmer 3s linear infinite",
        "pulse-gold":  "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212,175,55,0.3)" },
          "50%":      { boxShadow: "0 0 40px rgba(212,175,55,0.7), 0 0 80px rgba(212,175,55,0.2)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;