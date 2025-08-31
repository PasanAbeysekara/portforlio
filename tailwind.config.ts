import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
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
  			'gh-contrib-light-0': '#ebedf0',
  			'gh-contrib-light-1': '#9be9a8',
  			'gh-contrib-light-2': '#40c463',
  			'gh-contrib-light-3': '#30a14e',
  			'gh-contrib-light-4': '#216e39',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Helvetica',
  				'Arial',
  				'sans-serif'
  			],
  			mono: [
  				'SFMono-Regular',
  				'Consolas',
  				'Liberation Mono',
  				'Menlo',
  				'monospace'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  }
}
export default config