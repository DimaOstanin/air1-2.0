/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      direction: {
        'rtl': 'rtl',
      },
      colors: {
        'custom-burlywood': 'rgb(222, 184, 135)',
        'custom-almond' :'RGB( 239, 222, 205)',
        'custom-sandy-tan' :'RGB(253, 217, 181)',
        'custom-desert' :'RGB(250, 213, 165)',
        'custom-fall-green' :'RGB(236, 232, 185)',
        'custom-golden-glow' :'RGB(253, 233, 146)',
        'custom-khaki' :'RGB(240, 230, 140)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    // ...
  ],
};
