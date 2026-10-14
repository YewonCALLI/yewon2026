import type { Config } from 'tailwindcss'

export default {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      label: '0.875rem', // 14px - 키커, 캡션, 보조 텍스트
      body: ['1.125rem', { fontWeight: '500' }], // 18px / Medium - 본문
      heading: '1.25rem', // 20px - 소제목
      title: '1.5rem', // 24px - 섹션/프로젝트 제목
    },
    extend: {
      writingMode: {
        'vertical-lr': 'vertical-lr',
        'vertical-rl': 'vertical-rl',
        'horizontal-tb': 'horizontal-tb',
      },
      screens: {
        xs: '390px',
        lg: '1440px',
        xl: '1920px',
      },
      colors: {
        ink: '#3A3A3A', // 본문 텍스트
      },
      fontFamily: {
        // 한글용 폰트
        korean: ['var(--font-pretendard)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // 영문용 폰트
        english: ['var(--font-english)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      aspectRatio: {},
    },
  },
  plugins: [],
} satisfies Config
