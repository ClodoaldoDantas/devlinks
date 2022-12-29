import { styled } from '../../styles'

export const Field = styled('div', {
  width: '100%',
  height: '50px',
  backgroundColor: '$gray700',
  borderRadius: '5px',
  border: '2px solid $gray700',

  '&:focus-within': {
    borderColor: '$purple500',
  },
})

export const Input = styled('input', {
  width: '100%',
  height: '100%',
  padding: '0 1rem',
  outline: '0',
  border: '0',
  backgroundColor: 'transparent',
  borderRadius: '5px',
  color: '$white',

  '&::placeholder': {
    color: '$gray500',
  },
})
