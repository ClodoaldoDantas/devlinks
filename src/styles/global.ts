import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    backgroundColor: '$gray700',
    color: '$gray500',
  },

  button: {
    cursor: 'pointer',
  },

  a: {
    display: 'inline-block',
    textDecoration: 'none',
    color: 'inherit',
  },

  'body, input, textarea, button': {
    fontFamily: '$body',
    fontSize: '$md',
  },
})
