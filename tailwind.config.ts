import type { Config } from 'tailwindcss';
import type { PluginUtils } from 'tailwindcss/types/config';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bk: {
          DEFAULT: 'hsl(var(--bk))',
          minor: 'hsl(var(--bk-minor))',
        },
        ft: {
          DEFAULT: 'hsl(var(--ft))',
          minor: 'hsl(var(--ft-minor))',
          strong: 'hsl(var(--ft-strong))',
        },
      },
      fontFamily: {
        //TODO 字体调整
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      typography: ({ theme }: PluginUtils) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ft'),
            '--tw-prose-headings': theme('colors.ft.strong'),
            '--tw-prose-lead': theme('colors.ft'),
            '--tw-prose-links': theme('colors.ft'),
            '--tw-prose-bold': theme('colors.ft.strong'),
            '--tw-prose-counters': theme('colors.ft'),
            '--tw-prose-bullets': theme('colors.ft'),
            '--tw-prose-hr': theme('colors.ft'),
            '--tw-prose-quotes': theme('colors.ft.minor'),
            '--tw-prose-quote-borders': theme('colors.ft.minor'),
            '--tw-prose-captions': theme('colors.ft'),
            '--tw-prose-code': theme('colors.ft'),
            '--tw-prose-pre-code': theme('colors.ft'),
            '--tw-prose-pre-bg': theme('colors.bk'),
            '--tw-prose-th-borders': theme('colors.ft.minor'),
            '--tw-prose-td-borders': theme('colors.ft.minor'),
          },
        },
      }),
    },
  },
  plugins: [typography],
};
export default config;
