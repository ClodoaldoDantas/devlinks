import { User } from 'phosphor-react'
import { ComponentProps } from 'react'
import * as S from './styles'

interface AvatarProps extends ComponentProps<typeof S.AvatarImage> {
  size?: 'md' | 'lg'
  variant?: 'primary' | 'secondary'
}

const iconSize = {
  md: 20,
  lg: 36,
}

export function Avatar({
  size = 'md',
  variant = 'primary',
  ...rest
}: AvatarProps) {
  return (
    <S.AvatarRoot data-testid="avatar" size={size}>
      <S.AvatarImage {...rest} />

      <S.AvatarFallback variant={variant} delayMs={600}>
        <User size={iconSize[size]} />
      </S.AvatarFallback>
    </S.AvatarRoot>
  )
}
