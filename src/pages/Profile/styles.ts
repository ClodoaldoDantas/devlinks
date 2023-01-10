import { styled } from '../../styles'

export const Container = styled('main', {
  height: 'calc(100vh  - 92px)',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@sm': {
    padding: '1rem',
  },
})

export const Form = styled('form', {
  button: {
    marginTop: '0.875rem',
  },
})

export const Preview = styled('div', {
  textAlign: 'center',
  margin: '0 auto 1.5rem',
  width: 'max-content',
  position: 'relative',
})

export const UploadButton = styled('label', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: '2rem',
  height: '2rem',
  backgroundColor: '$purple500',
  position: 'absolute',
  bottom: 5,
  right: 0,
  cursor: 'pointer',

  svg: {
    color: '$white',
  },
})

export const InputFile = styled('input', {
  display: 'none',
})
