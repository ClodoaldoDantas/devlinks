import { styled } from '../../styles'
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,

  backgroundColor: 'rgba(0, 0, 0, 0.75)',
})

export const Content = styled(Dialog.Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  padding: '3rem',
  width: '100%',
  maxWidth: 540,
  borderRadius: 6,
  backgroundColor: '$gray600',
})

export const Title = styled(Dialog.Title, {
  fontWeight: '$semibold',
  color: '$white',
  fontSize: '$2xl',
  marginBottom: '2rem',
})

export const Form = styled('form', {
  button: {
    marginTop: '0.875rem',
  },
})

export const IconButton = styled('button', {
  all: 'unset',

  position: 'absolute',
  top: 24,
  right: 24,
  height: 24,
  width: 24,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  color: '$gray500',
  cursor: 'pointer',
})
