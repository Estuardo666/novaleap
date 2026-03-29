import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        novaleap: {
          navy: '#11224e',
          aqua: '#00b7b5',
          purple: '#977abc',
          darkPurple: '#2d1b4e',
        },
        // NOVALEAP Brand Color Palette
        teal: {
          50: '#f0f4f4',
          100: '#d1e5e6',
          200: '#a8cfd2',
          300: '#5aa4ab',
          400: '#1d7d88',
          500: '#004346', // Primary Teal
          600: '#003539',
          700: '#00282c',
          800: '#001b1f',
          900: '#000e10',
        },
        sage: {
          50: '#f4f7f4',
          100: '#dfe9df',
          200: '#bfd3bf',
          300: '#9db099',
          400: '#849177',
          500: '#749C75', // Primary Sage
          600: '#5f8460',
          700: '#4a684a',
          800: '#354f35',
          900: '#21351f',
        },
        mint: {
          50: '#f7faf6',
          100: '#eef4ec',
          200: '#d4e8e5',
          300: '#c2ddd8',
          400: '#b4d6ce',
          500: '#B0D0B0', // Primary Mint
          600: '#96b896',
          700: '#7a9d7a',
          800: '#5f885f',
          900: '#476d47',
        },
        sand: {
          50: '#fef9f6',
          100: '#fdf2eb',
          200: '#fae5d5',
          300: '#f8d8c0',
          400: '#f5ceab',
          500: '#F1DABF', // Primary Sand
          600: '#e8c8a8',
          700: '#d4b08b',
          800: '#b8926e',
          900: '#8f6f4f',
        },
        coral: {
          50: '#faf7f6',
          100: '#f5eae6',
          200: '#e8d0c9',
          300: '#dab4ab',
          400: '#cc9086',
          500: '#93545E', // Primary Coral
          600: '#7f434b',
          700: '#6b3538',
          800: '#572a2f',
          900: '#3d1e24',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'pulse-gentle': 'pulseGentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}

export default config
