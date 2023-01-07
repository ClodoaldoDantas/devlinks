import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Logo } from '../Logo'
import * as S from './styles'

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <S.Header>
      <S.HeaderContainer>
        <Link to="/admin/links">
          <Logo />
        </Link>

        <S.Profile>
          <strong>{user?.username}</strong>
          <button type="button" onClick={signOut}>
            Sair da conta
          </button>
        </S.Profile>
      </S.HeaderContainer>
    </S.Header>
  )
}
