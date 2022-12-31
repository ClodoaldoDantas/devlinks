import { createStitches } from '@stitches/react'

export const { styled, globalCss } = createStitches({
  media: {
    sm: '(max-width: 575px)',
  },
  theme: {
    colors: {
      white: '#FFFFFF',
      red500: '#d34242',
      gray700: '#121214',
      gray600: '#202024',
      gray500: '#999999',
      gray400: '#CCCCCC',
      purple600: '#41356B',
      purple500: '#8257E5',
      purple400: '#A883FF',
    },
    fonts: {
      body: 'Quicksand, sans-serif',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    },
    fontWeights: {
      normal: 400,
      semibold: 600,
    },
  },
})
