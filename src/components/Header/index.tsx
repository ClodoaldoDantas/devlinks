import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Avatar } from '../Avatar'
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
          <Avatar src={user?.avatar} alt={user?.username} />

          <div>
            <Link to="/admin/profile">{user?.username}</Link>
            <button type="button" onClick={signOut}>
              Sair da conta
            </button>
          </div>
        </S.Profile>
      </S.HeaderContainer>
    </S.Header>
  )
}
