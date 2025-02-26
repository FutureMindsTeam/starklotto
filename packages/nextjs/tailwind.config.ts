import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#000000",

          secondary: "#0B192C",

          accent: "#1E3E62",

          neutral: "#FF6500",

          "base-100": "#ffffff",

          info: "#000000",

          success: "#0B192C",

          warning: "#1E3E62",

          error: "#FF6500",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  daisyui: {
    themes: [
      {
        light: {
          primary: "#000000",
          "primary-content": "#0B192C",
          secondary: "#1E3E62",
          "secondary-content": "#FF6500",
          accent: "#000000",
          "accent-content": "#0B192C",
          neutral: "#1E3E62",
          "neutral-content": "#FF6500",
          "base-100": "#ffffff",
          "base-200": "#f4f8ff",
          "base-300": "#ffffff",
          "base-content": "#000000",
          info: "#0B192C",
          success: "#1E3E62",
          warning: "#FF6500",
          error: "#FF6500",
          "--rounded-btn": "9999rem",
        },
      },
      {
        dark: {
          primary: "#000000",
          "primary-content": "#0B192C",
          secondary: "#1E3E62",
          "secondary-content": "#FF6500",
          accent: "#000000",
          "accent-content": "#0B192C",
          neutral: "#1E3E62",
          "neutral-content": "#FF6500",
          "base-100": "#1E3E62",
          "base-200": "#0B192C",
          "base-300": "#000000",
          "base-content": "#FF6500",
          info: "#0B192C",
          success: "#1E3E62",
          warning: "#FF6500",
          error: "#FF6500",
          "--rounded-btn": "9999rem",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        "gradient-light": "linear-gradient(270deg, #000000 -17.42%, #0B192C 109.05%)",
        "gradient-dark": "var(--gradient, linear-gradient(90deg, #1E3E62 0%, #FF6500 100%))",
        "gradient-vertical": "linear-gradient(180deg, #000000 0%, #FF6500 100%)",
        "gradient-icon": "var(--gradient, linear-gradient(90deg, #0B192C 0%, #1E3E62 100%))",
      },
    },
  },
};
