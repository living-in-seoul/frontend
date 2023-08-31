/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        left: 'left',
      },
      animation: {
        skeleton: 'loading 1.5s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      utilities: {
        '.smooth-scroll': {
          '-webkit-overflow-scrolling': 'touch',
        },
      },
      colors: {
        customYellows: '#FEE500',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
