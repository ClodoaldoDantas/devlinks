import { styled } from '../../styles'

export const Card = styled('div', {
  padding: '1rem',
  backgroundColor: '$gray600',
  borderRadius: 5,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '&:hover button': {
    opacity: 1,
    visibility: 'visible',
  },
})

export const CardBody = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',

  strong: {
    fontSize: '$md',
    fontWeight: '$semibold',
    color: '$white',
  },

  span: {
    fontSize: '$sm',
    color: '#808080',
  },
})

export const IconButton = styled('button', {
  border: 0,
  borderRadius: 5,
  backgroundColor: '$red500',
  color: '$white',

  height: 36,
  width: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  opacity: 0,
  visibility: 'hidden',
  transition: 'all .1s linear',
})
