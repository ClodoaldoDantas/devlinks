import { styled } from '../../styles'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

export const AvatarRoot = styled(AvatarPrimitive.Root, {
  borderRadius: '100%',
  display: 'inline-block',
  overflow: 'hidden',

  variants: {
    size: {
      md: {
        width: 44,
        height: 44,
      },
      lg: {
        width: 96,
        height: 96,
      },
    },
  },
})

export const AvatarImage = styled(AvatarPrimitive.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
})

export const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$gray700',
  color: '$gray500',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$gray700',
      },
      secondary: {
        backgroundColor: '$gray600',
      },
    },
  },
})
