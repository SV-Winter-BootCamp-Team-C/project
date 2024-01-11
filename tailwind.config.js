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
        darkGray: '#8E8E8E',
        gray: '#B4B4B4',
        lightGray: '#D9D9D9',
        white: '#FFFFFF',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(157.12deg, #918dca -0.63%, #99a8db 43.47%, #a3c9f0 98.56%)',
        'custom-gradient-re': 'linear-gradient(157.12deg, #A3C9F0 -0.63%, #99a8db 43.47%, #918dca 98.56%)',
      },
    },
  },
  plugins: [],
};
