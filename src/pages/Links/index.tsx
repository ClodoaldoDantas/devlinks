import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import { Button } from '../../components/Button'
import { CardLink } from '../../components/CardLink'
import { Spinner } from '../../components/Spinner'
import { useLinks } from '../../hooks/useLinks'
import * as Dialog from '@radix-ui/react-dialog'
import * as S from './styles'

import { NewLinkModal } from './NewLinkModal'
import { Check, Link } from 'phosphor-react'
import { useAuth } from '../../hooks/useAuth'

export const newLinkFormSchema = zod.object({
  label: zod.string().min(1, 'Label é obrigatória'),
  url: zod.string().url('Digite uma URL válida'),
})

export type NewLinkFormData = zod.infer<typeof newLinkFormSchema>

export function Links() {
  const { links, isLoading, isError, createLink, deleteLink } = useLinks()
  const { user } = useAuth()

  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const newFormLink = useForm<NewLinkFormData>({
    resolver: zodResolver(newLinkFormSchema),
    defaultValues: {
      label: '',
      url: '',
    },
  })

  const { reset } = newFormLink

  useEffect(() => {
    if (isError) {
      toast.error('Não foi possível buscar os links')
    }
  }, [isError])

  const handleCreateNewLink = async (data: NewLinkFormData) => {
    try {
      await createLink(data)
      toast.success('Link adicionado com sucesso')
      reset()
    } catch (err) {
      toast.error((err as Error).message)
    } finally {
      setOpen(false)
    }
  }

  const handleDeleteLink = async (link_id: string) => {
    if (!window.confirm('Tem certeza que deseja remover o link ?')) return

    try {
      await deleteLink(link_id)
      toast.success('Link removido com sucesso')
      reset()
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  const handleOpenUrl = () => {
    const { protocol, host } = window.location
    const pageUrl = `${protocol}//${host}/${user?.username}`

    navigator.clipboard.writeText(pageUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 400)
  }

  if (isLoading) {
    return (
      <S.Loading data-testid="loading">
        <Spinner />
      </S.Loading>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <h2>Meus Links</h2>

        <S.HeaderActions>
          <Tippy content="Copiar URL">
            <Button onClick={handleOpenUrl} disabled={copied}>
              {copied ? <Check size={24} /> : <Link size={24} />}
            </Button>
          </Tippy>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <Button>Adicionar novo</Button>
            </Dialog.Trigger>

            <FormProvider {...newFormLink}>
              <NewLinkModal onSubmit={handleCreateNewLink} />
            </FormProvider>
          </Dialog.Root>
        </S.HeaderActions>
      </S.Header>

      <S.Links>
        {links?.map((link) => (
          <CardLink data={link} key={link.id} onDelete={handleDeleteLink} />
        ))}
      </S.Links>
    </S.Container>
  )
}
