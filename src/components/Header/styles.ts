import { styled } from '../../styles'

export const Header = styled('header', {
  backgroundColor: '$gray600',
  padding: '1.5rem 1rem',
})

export const HeaderContainer = styled('div', {
  maxWidth: '72rem',
  margin: '0 auto',
  padding: '0 1rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const Profile = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',

  strong: {
    fontSize: '$sm',
    fontWeight: '$semibold',
    color: '$white',
  },

  button: {
    border: 0,
    backgroundColor: 'transparent',
    fontSize: '$sm',
    color: '$purple500',
    textAlign: 'left',
  },
})
