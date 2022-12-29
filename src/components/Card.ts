import { styled } from '../styles'

export const Card = styled('div', {
  maxWidth: '480px',
  width: '100%',
  margin: '0 auto',
  backgroundColor: '$gray600',
  borderRadius: '5px',
  padding: '4rem',

  '@sm': {
    padding: '2.5rem',
  },
})
