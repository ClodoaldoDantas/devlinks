import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../../components/Button'
import { CardLink } from '../../components/CardLink'
import { Spinner } from '../../components/Spinner'
import { useFetch } from '../../hooks/useFetch'
import { Link } from '../../interfaces/link'
import * as S from './styles'

export function Links() {
  const { data: links, isLoading, isError } = useFetch<Link[]>('links')

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
        <Button>Adicionar novo</Button>
      </S.Header>

      <S.Links>
        {links?.map((link) => (
          <CardLink data={link} key={link.id} />
        ))}
      </S.Links>
    </S.Container>
  )
}
