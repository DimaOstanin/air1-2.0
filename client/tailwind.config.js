/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      direction: {
        'rtl': 'rtl',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    // ...
  ],
};
