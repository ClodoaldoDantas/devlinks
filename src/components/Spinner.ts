import { styled, keyframes } from '../styles'

const rotation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const Spinner = styled('span', {
  width: '3rem',
  height: '3rem',
  border: '5px solid #FFF',
  borderBottomColor: 'transparent',
  borderRadius: '50%',
  display: 'inline-block',
  animation: `${rotation} 1s linear infinite`,
})
