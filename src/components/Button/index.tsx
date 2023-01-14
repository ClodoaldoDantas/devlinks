import { ButtonHTMLAttributes, forwardRef } from 'react'
import * as S from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <S.ButtonContainer type="button" {...props} ref={ref} />
  },
)
