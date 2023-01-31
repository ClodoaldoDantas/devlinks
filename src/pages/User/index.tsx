import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar } from '../../components/Avatar'
import { Link } from '../../components/Link'
import { Spinner } from '../../components/Spinner'
import { User as IUser } from '../../contexts/AuthContext'
import { Link as ILink } from '../../interfaces/link'
import { http } from '../../services/http'
import * as S from './styles'

type UserData = IUser & {
  links: ILink[]
}

export function UserPage() {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<UserData | null>(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await http.get(`users/${params.username}`)
        setData(response.data)
      } catch {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [params.username])

  return (
    <S.Container>
      {isLoading ? (
        <Spinner data-testid="loading" />
      ) : isError ? (
        <p>Nenhum usuário encontrado</p>
      ) : (
        <S.Main>
          <S.Header>
            <Avatar
              src={data?.avatar}
              alt={data?.username}
              variant="secondary"
              size="lg"
            />

            <strong>{data?.username}</strong>
            <p>{data?.bio}</p>
          </S.Header>

          <S.Links>
            {data?.links.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                data-testid="user-link"
              >
                {link.label}
              </Link>
            ))}
          </S.Links>

          <S.Footer>
            <p>
              feito com 💜 por{' '}
              <a href="https://github.com/clodoaldodantas">Clodoaldo Dantas</a>
            </p>
          </S.Footer>
        </S.Main>
      )}
    </S.Container>
  )
}
