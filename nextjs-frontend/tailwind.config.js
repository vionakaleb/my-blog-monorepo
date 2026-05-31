// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {},
    },
    // Add daisyui here
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require('daisyui')],
  
    // (Optional) Configure themes
    daisyui: {
      themes: ['winter', 'dark', 'cmyk'],
    },
  };