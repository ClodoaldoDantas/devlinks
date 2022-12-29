import { styled } from '../../styles'

export const Textarea = styled('textarea', {
  width: '100%',
  minHeight: '120px',
  padding: '1rem',
  outline: 0,
  backgroundColor: '$gray700',
  borderRadius: '5px',
  border: '2px solid $gray700',
  color: '$white',
  resize: 'vertical',

  '&::placeholder': {
    color: '$gray500',
  },

  '&:focus': {
    borderColor: '$purple500',
  },
})
