/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sse: {
          bg: "#0E0E10",
          surface: "#161618",
          border: "#262629",
          elevated: "#1C1C1F",
          elevatedBorder: "#363639",
          text: "#F4F4F5",
          secondary: "#A1A1AA",
          tertiary: "#71717A",
          silver: "#C9CDD4",
          silverBright: "#E4E6EB",
        },
        coach: {
          primary: "#0F3D2E",
          accent: "#A8C4B4",
        },
        airmix: {
          primary: "#FF2D6F",
          accent: "#C0C0C8",
        },
        crave: {
          primary: "#C8553D",
          accent: "#F5EDE2",
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', "serif"],
        sans: ["Geist", "Inter", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', '"SFMono-Regular"', "Consolas", "monospace"],
      },
      transitionTimingFunction: {
        linearish: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.4)",
        cardHover: "0 12px 32px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};
