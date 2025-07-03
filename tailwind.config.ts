import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Paleta Skin Tone personalizada
        primary: {
          50: "#FAF7F5",
          100: "#F5EDE7",
          200: "#E8D5C4",
          300: "#D4B5A0",
          400: "#C19A7E",
          500: "#B08968", // Tom principal
          600: "#9A7A5F",
          700: "#7D6249",
          800: "#5F4A37",
          900: "#3D2F24",
        },
        secondary: {
          50: "#FAF8F6",
          100: "#F2EBE3",
          200: "#E5D4C1",
          300: "#D1B896",
          400: "#BC9D6E",
          500: "#A8834A",
          600: "#8F6B3C",
          700: "#735530",
          800: "#574026",
          900: "#3B2B1A",
        },
        accent: {
          50: "#F9F6F4",
          100: "#F0E8E2",
          200: "#DCC8B8",
          300: "#C5A48A",
          400: "#AD7F5C",
          500: "#965D37",
          600: "#7D4D2E",
          700: "#643E25",
          800: "#4B2F1C",
          900: "#322013",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
