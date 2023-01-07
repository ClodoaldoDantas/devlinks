import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import * as zod from 'zod'

import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Textarea } from '../../components/Textarea'
import { TextInput } from '../../components/TextInput'
import { Logo } from '../../components/Logo'
import { http } from '../../services/http'
import { errorHandler } from '../../utils/errorHandler'
import * as S from './styles'

const signUpFormSchema = zod.object({
  username: zod.string().min(1, 'Usuário é obrigatório'),
  password: zod.string().min(1, 'Senha é obrigatória'),
  bio: zod.string().nullable(),
})

type SignUpFormData = zod.infer<typeof signUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()

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
    try {
      await http.post('users', data)
      toast.success('Cadastro realizado com sucesso! Faça login para continuar')

      navigate('/')
    } catch (err) {
      errorHandler(err)
    }
  }

  return (
    <S.Container>
      <Card>
        <S.Header>
          <Logo />
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
