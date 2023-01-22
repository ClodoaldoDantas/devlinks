import { forwardRef, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import { FormGroup, ErrorMessage } from '../Form'
import * as S from './styles'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, error, ...rest }, ref) => {
    return (
      <FormGroup>
        <S.Input name={name} {...rest} ref={ref} />
        {!!error && <ErrorMessage role="alert">{error?.message}</ErrorMessage>}
      </FormGroup>
    )
  },
)
