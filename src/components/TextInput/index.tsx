import { InputHTMLAttributes } from 'react'
import * as S from './styles'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function TextInput(props: TextInputProps) {
  return (
    <S.Field>
      <S.Input {...props} />
    </S.Field>
  )
}
