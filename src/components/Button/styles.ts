import { styled } from '../../styles'

export const ButtonContainer = styled('button', {
  width: '100%',
  height: '50px',
  borderRadius: '5px',
  border: 0,

  backgroundColor: '$purple500',
  color: '$white',
  fontWeight: '$semibold',

  '&:not(:disabled):hover': {
    backgroundColor: '$purple400',
  },

  '&:disabled': {
    backgroundColor: '$purple600',
    cursor: 'not-allowed',
  },
})
