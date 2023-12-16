import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-fond': 'linear-gradient(to left bottom, rgb(251, 207, 232), rgb(255, 255, 255), rgb(254, 202, 202))',
      },
      // colors: {
      //     'couleur-perso' : 'colors'
      //   },
      },
    },
  plugins: [],
}
export default config
