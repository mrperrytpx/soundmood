/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        cat: "url('../../public/background.webp')",
      },
      keyframes: {
        wavepulse: {
          "0%": {
            boxShadow: "0 0 0 0 #1fcfc180",
          },

          "70%": {
            boxShadow: "0 0 0 30px #1fcfc100",
          },

          "100%": {
            boxShadow: "0 0 0 0 #1fcfc100",
          },
        },
      },
      animation: {
        wavepulse: "wavepulse 3s infinite",
      },
    },
  },
  plugins: [],
};
