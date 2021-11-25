/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
  mode: "jit",
  purge: ["src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("daisyui")],
  theme: true,
};
