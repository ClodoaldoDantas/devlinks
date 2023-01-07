import { styled } from '../../styles'

export const Input = styled('input', {
  width: '100%',
  height: '50px',
  padding: '0 1rem',
  backgroundColor: '$gray700',
  border: '2px solid $gray700',
  borderRadius: '5px',
  color: '$white',
  outline: 0,

  '&:focus': {
    borderColor: '$purple500',
  },

  '&::placeholder': {
    color: '$gray500',
  },
})
