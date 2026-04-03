import daisyui from "daisyui";

export default {
  content: [
    "./templates/**/*.html",
    "./config/templates/**/*.html",
    "./home/templates/**/*.html",
    "./search/templates/**/*.html",
    "./sitepages/templates/**/*.html",
    "./config/static/**/*.js",
    "./home/static/**/*.js",
    "./sitepages/static/**/*.js"
  ],
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"]
  }
};
