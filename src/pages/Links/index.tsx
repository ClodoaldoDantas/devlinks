import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { CardLink } from '../../components/CardLink'
import { Spinner } from '../../components/Spinner'
import { useLinks } from '../../hooks/useLinks'
import * as Dialog from '@radix-ui/react-dialog'
import * as S from './styles'

import { NewLinkModal } from '../../components/NewLinkModal'

export function Links() {
  const { links, isLoading, isError } = useLinks()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isError) {
      toast.error('Não foi possível buscar os links')
    }
  }, [isError])

  if (isLoading) {
    return (
      <S.Loading>
        <Spinner />
      </S.Loading>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <h2>🔗 Meus Links</h2>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <Button>Adicionar novo</Button>
          </Dialog.Trigger>

          <NewLinkModal />
        </Dialog.Root>
      </S.Header>

      <S.Links>
        {links?.map((link) => (
          <CardLink data={link} key={link.id} />
        ))}
      </S.Links>
    </S.Container>
  )
}
