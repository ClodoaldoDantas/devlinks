import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Textarea } from '../../components/Textarea'
import { TextInput } from '../../components/TextInput'
import * as S from './styles'

export function SignUp() {
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
          <Textarea placeholder="Bio" />
          <Button type="submit">Cadastrar</Button>
        </S.Form>

        <S.Footer>
          <p>
            Já tem uma conta? <a href="#">Faça login</a>
          </p>
        </S.Footer>
      </Card>
    </S.Container>
  )
}
