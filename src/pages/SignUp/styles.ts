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
    marginBottom: '0.875rem',
  },

  p: {
    fontSize: '$sm',
    color: '$gray400',
  },
})

export const Form = styled('form', {
  button: {
    margin: '0.875rem 0 1.5rem',
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
