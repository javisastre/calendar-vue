const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "swash": ["Pacifico", ...defaultTheme.fontFamily.sans],
        "signika": ["Signika", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
