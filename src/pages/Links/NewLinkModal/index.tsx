import { X } from 'phosphor-react'
import { useFormContext } from 'react-hook-form'

import { TextInput } from '../../../components/TextInput'
import { Button } from '../../../components/Button'
import { NewLinkFormData } from '..'

import * as Dialog from '@radix-ui/react-dialog'
import * as S from './styles'

interface NewLinkModalProps {
  onSubmit: (data: NewLinkFormData) => void
}

export function NewLinkModal({ onSubmit }: NewLinkModalProps) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useFormContext<NewLinkFormData>()

  return (
    <Dialog.Portal>
      <S.Overlay />

      <S.Content>
        <S.Title>Novo Link</S.Title>

        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            type="text"
            placeholder="Label"
            {...register('label')}
            error={errors.label}
          />

          <TextInput
            type="text"
            placeholder="URL"
            {...register('url')}
            error={errors.url}
          />

          <Button type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </S.Form>

        <Dialog.Close asChild>
          <S.IconButton aria-label="Close">
            <X size={24} />
          </S.IconButton>
        </Dialog.Close>
      </S.Content>
    </Dialog.Portal>
  )
}
