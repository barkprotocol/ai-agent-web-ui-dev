import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      fontFamily: {
        title: ["Oswald", "sans-serif"], // Preferred font for titles
        body: ["Poppins", "sans-serif"], // Preferred font for body text
        display: ["Syne", "sans-serif"], // Additional font
      },
      screens: {
        xs: "400px", // Custom small screen size
      },
      spacing: {
        18: "4.5rem", // Custom spacing for padding/margins
        22: "5.5rem",
        26: "6.5rem",
      },
      boxShadow: {
        "soft-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)", // Soft shadow effect
        "soft-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      },
      transitionProperty: {
        height: "height",
        width: "width",
        spacing: "margin, padding",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Improves form styling
    require("@tailwindcss/typography"), // Enhances typography
    require("@tailwindcss/aspect-ratio"), // Enables aspect ratios
  ],
};

export default config;
