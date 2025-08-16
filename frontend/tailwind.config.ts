import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        caret: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        codeGlow: {
          "0%, 100%": { textShadow: "0 0 6px #22c55e, 0 0 12px #22c55e" },
          "50%": { textShadow: "0 0 2px #22c55e, 0 0 4px #22c55e" },
        },
        scanline: {
          "0%": { backgroundPosition: "0 -100%" },
          "100%": { backgroundPosition: "0 100%" },
        },
        pulseBg: {
          "0%, 100%": { boxShadow: "0 0 10px #00ff00" },
          "50%": { boxShadow: "0 0 20px #00ff00" },
        },
      },
      animation: {
        caret: "caret 1s step-start infinite",
        codeGlow: "codeGlow 2s ease-in-out infinite",
        scanline: "scanline 3s linear infinite",
        pulseBg: "pulseBg 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
