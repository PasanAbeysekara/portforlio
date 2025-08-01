import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gh-bg': '#0d1117',
        'gh-bg-secondary': '#161b22',
        'gh-border': '#30363d',
        'gh-border-active': '#8b949e',
        'gh-text': '#e6edf3',
        'gh-text-secondary': '#8b949e',
        'gh-link': '#58a6ff',
        'gh-green': '#39d353',
        'gh-green-active': '#26a641',
        'gh-button': '#21262d',
        'gh-button-hover': '#30363d',
        'gh-blue-tag': 'rgba(88, 166, 255, 0.15)',
        'gh-contrib-0': '#161b22',
        'gh-contrib-1': '#0e4429',
        'gh-contrib-2': '#006d32',
        'gh-contrib-3': '#26a641',
        'gh-contrib-4': '#39d353',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config