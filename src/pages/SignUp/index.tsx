import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Textarea } from '../../components/Textarea'
import { TextInput } from '../../components/TextInput'
import * as S from './styles'

const signUpFormSchema = zod.object({
  username: zod.string().min(1, 'Usuário é obrigatório'),
  password: zod.string().min(1, 'Senha é obrigatória'),
  bio: zod.string().nullable(),
})

type SignUpFormData = zod.infer<typeof signUpFormSchema>

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: '',
      password: '',
      bio: null,
    },
  })

  const handleSignUp: SubmitHandler<SignUpFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    console.log(data)
  }

  return (
    <S.Container>
      <Card>
        <S.Header>
          <h1>💻 DevLinks</h1>
          <p>Tudo o que você é. Em um simples link.</p>
        </S.Header>

        <S.Form onSubmit={handleSubmit(handleSignUp)}>
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

          <Textarea placeholder="Bio" {...register('bio')} />

          <Button type="submit" disabled={isSubmitting}>
            Cadastrar
          </Button>
        </S.Form>

        <S.Footer>
          <p>
            Já tem uma conta? <Link to="/">Faça login</Link>
          </p>
        </S.Footer>
      </Card>
    </S.Container>
  )
}
