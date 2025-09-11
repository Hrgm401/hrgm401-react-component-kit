// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ぽよんとしたアニメーションのキーフレームを定義
      keyframes: {
        'poyon': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      // keyframesをアニメーションとして登録
      animation: {
        'poyon': 'poyon 0.2s ease-out forwards',
      }
    },
  },
  plugins: [
    
  ],
} satisfies Config