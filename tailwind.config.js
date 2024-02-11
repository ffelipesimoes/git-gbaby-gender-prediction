module.exports = {
   content: [
     "./src/**/*.{js,jsx,ts,tsx}",
   ],
   theme: {
      extend: {
          keyframes: {
              move: {
                  '0%': {
                      transform: 'translateX(0%)'
                  },
                  '100%': {
                      transform: 'translateX(-50%)'
                  },
              },
              wiggle: {
               '0%, 100%': { transform: 'rotate(-8deg)' },
               '50%': { transform: 'rotate(8deg)' },
             },
             zoom: {
               '0%': { opacity: '0.7' },
             }
          },
          animation: {
              move: 'move 40s linear infinite',
              wiggle: 'wiggle ease-in-out 2s infinite',
              pulse2: 'pulse 0.4s ',
              scale: 'zoom 0.5s   '
          }
      },
  },
  variants: {},
  plugins: [],
 }