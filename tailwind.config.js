/** @type {import('tailwindcss').Config} */

// Below is the default styling
// export default {
//   content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

//  This is the styling that i have configured some colors into
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Your custom colors
        gold: '#956f42',
        dark: '#262624',
        orange: '#f06721',
        blue: '#6495fb',
        // Extended variations for design flexibility
        'gold-light': '#a68458',
        'gold-dark': '#7d5c37',
        'dark-lighter': '#36363a',
        'orange-light': '#f48149',
        'orange-dark': '#d35616',
        'blue-light': '#83abfc',
        'blue-dark': '#437ef9',
      },
      backgroundColor: {
        primary: '#262624',
        secondary: '#2d2d2b',
        tertiary: '#323230',
      },
      textColor: {
        primary: '#ffffff',
        secondary: '#e0e0e0',
        tertiary: '#b0b0b0',
        muted: '#808080',
      },
      borderColor: {
        subtle: '#3a3a38',
      },
      gradientColorStops: (theme) => ({
        ...theme('colors'),
        'card-from': '#2d2d2b',
        'card-to': '#232321',
        'cta-from': 'rgba(246, 103, 33, 0.05)',
        'cta-to': 'rgba(100, 149, 251, 0.05)',
      }),
    },
  },
  plugins: [],
}
