/** @type {import('tailwindcss').Config} */
const config = {
  // 1. Move darkMode here, outside of content
  darkMode: 'class', 
  
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // You can add your custom fonts here if needed
     fontFamily: {
  jakarta: ['var(--font-jakarta)', 'sans-serif'],   // ✅ match layout.js
  mulish: ['var(--font-mulish)', 'sans-serif'],      // ✅ add these too
  jost: ['var(--font-jost)', 'sans-serif'],          // ✅
},
      typography: {
  DEFAULT: {
    css: {
      // Let inline styles win — don't lock down font-weight
      strong: null,
      b: null,
      em: null,
      i: null,
      // Don't set fixed colors/sizes on headings; let the inline styles through
      h1: { scrollMarginTop: "6rem" },
      h2: { scrollMarginTop: "6rem" },
      h3: { scrollMarginTop: "6rem" },
      h4: { scrollMarginTop: "6rem" },
      // Keep your link styles
      a: {
        color: "#0070A1",
        textDecoration: "none",
        fontWeight: "500",
        "&:hover": { textDecoration: "underline" },
      },
    },
  },
},
    },
  },

  plugins: [],
};

export default config;
