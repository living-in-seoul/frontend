/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
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
        primary: '#2DDAB0',
        darkMint: '#00C092',
        lightMint: '#ACECDC',
        lightestMint: '#DEFFF7',
        gray1: '#1F1F1F',
        gray2: '#404040',
        gray3: '#555555',
        gray4: '#787878',
        gray5: '#B8B8B8',
        gray6: '#D9D9D9',
        gray7: '#F2F2F2',
        white: '#FFFFFF',
        customYellows: '#FEE500',
        // backgroundColor: '#2DDAB0',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
