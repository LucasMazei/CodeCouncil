/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'geist': ['var(--font-geist-sans)'],
        'geist-mono': ['var(--font-geist-mono)'],
      },
      colors: {
        // Dark mode colors
        'neon-blue': 'oklch(.623 .214 259.815)',
        'dark-bg': '#0a0a0a',
        'dark-card': '#111111',
        'dark-border': '#1a1a1a',
        // Light mode colors
        'light-blue': 'oklch(.623 .214 259.815)',
        'light-bg': '#f8f9fa',
        'light-card': '#ffffff',
        'light-border': '#e1e4e8',
      },
      boxShadow: {
        'neon': '0 0 10px oklch(.623 .214 259.815 / 0.25)',
        'light': '0 0 10px oklch(.623 .214 259.815 / 0.15)',
      },
    },
  },
  plugins: [],
}

