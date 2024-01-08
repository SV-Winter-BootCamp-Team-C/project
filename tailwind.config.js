/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // 메인 및 서브 색상 지정
      colors: {
        darkPurple: '#66629F',
        purple: '#918DCA',
        skyBlue: '#A3C9F0',
        darkGary: '#8E8E8E',
        gray: '#B4B4B4',
        lightGray: '#D9D9D9',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
