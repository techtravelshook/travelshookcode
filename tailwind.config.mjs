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
        jakarta: ['var(--font-plus-jakarta-sans)', 'sans-serif'],
      },
    },
  },

  plugins: [],
};

export default config;
