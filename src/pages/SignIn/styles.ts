import { styled } from '../../styles'

export const Container = styled('main', {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@sm': {
    padding: '1rem',
  },
})

export const Header = styled('header', {
  textAlign: 'center',
  marginBottom: '1.5rem',

  h1: {
    fontSize: '$2xl',
    fontWeight: '$semibold',
    marginBottom: '0.875rem',
    color: '$white',
  },

  p: {
    fontSize: '$sm',
    color: '$gray400',
  },
})

export const Form = styled('form', {
  'input:first-child': {
    marginBottom: '0.625rem',
  },

  button: {
    margin: '1.5rem 0',
  },
})

export const Footer = styled('footer', {
  textAlign: 'center',

  p: {
    fontSize: '$sm',
    color: '$gray400',
  },

  a: {
    color: '$purple500',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
})
