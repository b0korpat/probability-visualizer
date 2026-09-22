import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: { display: ["var(--font-display)"], sans: ["var(--font-body)"] },
      colors: { ink: "#151719", paper: "#f4f1eb", lime: "#d7f36b" }
    }
  },
  plugins: []
};
export default config;
