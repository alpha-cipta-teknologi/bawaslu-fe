/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
        'secondary': ['Inter', 'Helvetica', 'Arial', 'sans-serif']
      },
      fontSize: {
        xxs: '0.625rem',
        '2.5xl': '1.75rem',
        '5.5xl': ['3.25rem', '4rem']
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#FF8101', // ganti value ini jika primary color berubah
        secondary: '#365F8C',
        white: '#ffffff',
        black: {
          default: '#000000',
          primary: '#333333'
        },
        orange: {
          primary: '#FF8101'
        },
        blue: {
          midnight: '#365F8C',
          navy: '#17253F'
        },
        grey: {
          lighter: {
            1: '#F9F9F9',
            2: '#F2F2F2',
            3: '#F5F5F5',
          },
          light: {
            1: '#E0E0E0',
            2: '#E1ECF4',
            3: '#D8D8D8',
            4: '#D9D9D9',
            5: '#D2D2D2',
            6: '#DBDBDB',
            7: '#828282',
            8: '#787878'
          },
          base: '#999999',
          dark: '#595959'
        },
        red: {
          light: {
            1: '#EB5757'
          }
        }
      },
      boxShadow: {
        '2md': '0px 4px 24px rgba(51, 51, 51, 0.12)'
      },
      spacing: {
        '4.5': '1.125rem',
        '6.5': '1.563rem',
        '7.5': '1.875rem',
        '12.5': '3.125rem',
        '15': '3.75rem'
      },
      screens: {
        '2lg': '1100px',
        '3lg': '1200px'
      },
      borderRadius: {
        '2sm': '3px'
      },
      backgroundImage: {
        gradient1: 'linear-gradient(180deg, rgba(51, 51, 51, 0) 0%, #333333 100%)',
        gradient2: 'linear-gradient(180.59deg, rgba(51, 51, 51, 0) -11.75%, #333333 118.76%)'
      },
      keyframes: {
        sync: {
          '33%': { transform: 'translateY(10px)' },
          '66%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        sync: 'sync 0.6s ease-in-out infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms')
  ],
}
