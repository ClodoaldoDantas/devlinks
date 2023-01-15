import { styled } from '../../styles'

export const Container = styled('div', {
  maxWidth: '72rem',
  margin: '0 auto',
  padding: '0 1rem',
})

export const Header = styled('div', {
  padding: '2rem 0',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  button: {
    maxWidth: '12.5rem',
  },

  h2: {
    fontSize: '$2xl',
    fontWeight: '$semibold',
    color: '$white',
  },
})

export const Loading = styled('div', {
  height: 'calc(100vh - 92px)',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const Links = styled('div', {
  display: 'grid',
  gap: '1rem',
})
