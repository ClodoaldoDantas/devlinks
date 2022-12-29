import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { TextInput } from '../../components/TextInput'
import * as S from './styles'

export function SignIn() {
  return (
    <S.Container>
      <Card>
        <S.Header>
          <h1>💻 DevLinks</h1>
          <p>Tudo o que você é. Em um simples link.</p>
        </S.Header>

        <S.Form>
          <TextInput type="text" placeholder="Usuário" />
          <TextInput type="password" placeholder="Senha" />
          <Button type="submit">Entrar</Button>
        </S.Form>

        <S.Footer>
          <p>
            Não tem uma conta? <Link to="/sign-up">Registre-se</Link>
          </p>
        </S.Footer>
      </Card>
    </S.Container>
  )
}
