import { styled } from '../../styles'
import { Button } from '../Button'

export const Tooltip = styled('span', {
  position: 'absolute',
  top: -40,
  left: '50%',
  transform: 'translate(-50%)',
  background: '#333',
  color: '$white',
  padding: '0.25rem 0.5rem',
  borderRadius: 5,
  fontSize: '$sm',
  transition: 'all 0.1s linear',
  textAlign: 'center',
  width: 'max-content',

  opacity: 0,
  visibility: 'hidden',
  pointerEvents: 'none',

  '&:before': {
    position: 'absolute',
    bottom: -3,
    content: '',
    height: 8,
    width: 8,
    background: '#333',
    left: '50%',
    transform: 'translate(-50%) rotate(45deg)',
  },
})

export const ClipboardButton = styled(Button, {
  width: 50,
  fontSize: 0,

  svg: {
    height: 24,
    width: 24,
  },

  '&:hover ~ span': {
    opacity: 1,
    visibility: 'visible',
    pointerEvents: 'auto',
  },
})

export const Container = styled('div', {
  position: 'relative',
})
