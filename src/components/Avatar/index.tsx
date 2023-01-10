import { User } from 'phosphor-react'
import { ComponentProps } from 'react'
import * as S from './styles'

interface AvatarProps extends ComponentProps<typeof S.AvatarImage> {
  size?: 'md' | 'lg'
}

const iconSize = {
  md: 20,
  lg: 36,
}

export function Avatar({ size = 'md', ...rest }: AvatarProps) {
  return (
    <S.AvatarRoot size={size}>
      <S.AvatarImage {...rest} />

      <S.AvatarFallback delayMs={600}>
        <User size={iconSize[size]} />
      </S.AvatarFallback>
    </S.AvatarRoot>
  )
}
