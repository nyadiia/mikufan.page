/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["CozetteVector", "droid-mono"],
        body: ["Exo"]
      },
    },
  },
  plugins: [],
};
