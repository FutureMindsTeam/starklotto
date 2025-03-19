/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],

  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        light: {
          primary: "#794BFC",
          secondary: "#F4F1FD",
          accent: "#1FB2A6",
          neutral: "#191D24",
          "base-100": "#ffffff",
          "menu-active": "#794BFC",
          "menu-hover": "#8B45FC",
          "menu-default": "#64748B"
        }
      }
    ]
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
        glow: "0 0 15px rgba(123,97,255,0.2)"
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite"
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backgroundImage: {
        "gradient-light": "linear-gradient(270deg, #A7ECFF -17.42%, #E8B6FF 109.05%)",
        "gradient-dark": "var(--gradient, linear-gradient(90deg, #42D2F1 0%, #B248DD 100%))",
        "gradient-vertical": "linear-gradient(180deg, #3457D1 0%, #8A45FC 100%)",
        "gradient-icon": "var(--gradient, linear-gradient(90deg, #42D2F1 0%, #B248DD 100%))",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      colors: {
        menu: {
          default: "#64748B",
          hover: "#8B45FC",
          active: "#794BFC"
        },
        background: {
          DEFAULT: "#000000",
          light: "#1A1A1A"
        }
      },
      transitionProperty: {
        'colors': 'color, background-color, fill, stroke',
        'transform': 'transform'
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
};
