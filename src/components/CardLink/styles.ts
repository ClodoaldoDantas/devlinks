import { styled } from '../../styles'

export const Card = styled('div', {
  padding: '1rem',
  backgroundColor: '$gray600',
  borderRadius: 5,
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
