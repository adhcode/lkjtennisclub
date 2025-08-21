import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'agrandir': ['var(--font-agrandir)', 'sans-serif'],
        'agrandir-bold': ['var(--font-agrandir)', 'sans-serif'],
        'agrandir-heavy': ['var(--font-agrandir)', 'sans-serif'],
        'raleway': ['var(--font-raleway)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
