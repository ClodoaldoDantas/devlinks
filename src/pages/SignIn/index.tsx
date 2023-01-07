import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { TextInput } from '../../components/TextInput'
import { Logo } from '../../components/Logo'
import { useAuth } from '../../hooks/useAuth'

import * as S from './styles'

const signInFormSchema = zod.object({
  username: zod.string().min(1, 'Usuário é obrigatório'),
  password: zod.string().min(1, 'Senha é obrigatória'),
})

type SignInFormData = zod.infer<typeof signInFormSchema>

export function SignIn() {
  const { signIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleSignIn: SubmitHandler<SignInFormData> = (data) => {
    signIn(data)
  }

  return (
    <S.Container>
      <Card>
        <S.Header>
          <Logo />
          <p>Tudo o que você é. Em um simples link.</p>
        </S.Header>

        <S.Form onSubmit={handleSubmit(handleSignIn)}>
          <TextInput
            type="text"
            placeholder="Usuário"
            {...register('username')}
            error={errors.username}
          />

          <TextInput
            type="password"
            placeholder="Senha"
            {...register('password')}
            error={errors.password}
          />

          <Button type="submit" disabled={isSubmitting}>
            Entrar
          </Button>
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
