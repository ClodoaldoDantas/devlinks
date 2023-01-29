import { styled } from '../../styles'

export const Container = styled('div', {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@sm': {
    padding: '1rem',
  },
})

export const Main = styled('main', {
  maxWidth: 450,
  width: '100%',
})

export const Header = styled('header', {
  textAlign: 'center',
  marginBottom: '2rem',

  strong: {
    display: 'block',
    margin: '1.5rem 0 0.5rem',
    fontSize: '1.5rem',
    fontWeight: '$semibold',
    color: '$white',
  },

  p: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
})

export const Links = styled('nav', {
  marginBottom: '4rem',
  display: 'grid',
  gap: '0.75rem',
})

export const Footer = styled('footer', {
  p: {
    textAlign: 'center',
    fontSize: '0.875rem',
  },

  a: {
    textDecoration: 'underline',
  },
})
