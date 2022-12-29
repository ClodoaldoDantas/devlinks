import { TextareaHTMLAttributes } from 'react'
import * as S from './styles'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea(props: TextareaProps) {
  return <S.Textarea {...props} />
}
