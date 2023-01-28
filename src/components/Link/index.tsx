import { AnchorHTMLAttributes } from 'react'
import * as S from './styles'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export function Link({ children, ...rest }: LinkProps) {
  return <S.LinkContainer {...rest}>{children}</S.LinkContainer>
}
