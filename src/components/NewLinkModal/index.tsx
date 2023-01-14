import { X } from 'phosphor-react'
import { Button } from '../Button'
import { TextInput } from '../TextInput'

import * as Dialog from '@radix-ui/react-dialog'
import * as S from './styles'

export function NewLinkModal() {
  return (
    <Dialog.Portal>
      <S.Overlay />

      <S.Content>
        <S.Title>Novo Link</S.Title>

        <S.Form>
          <TextInput type="text" placeholder="Label" />
          <TextInput type="url" placeholder="URL" />
          <Button type="submit">Salvar</Button>
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
