import { forwardRef, TextareaHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import { FormGroup, ErrorMessage } from '../Form'
import * as S from './styles'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, error, ...rest }, ref) => {
    return (
      <FormGroup>
        <S.Textarea name={name} {...rest} ref={ref} />
        {!!error && <ErrorMessage>{error?.message}</ErrorMessage>}
      </FormGroup>
    )
  },
)
