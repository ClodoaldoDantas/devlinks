import { ChangeEvent } from 'react'
import { Camera } from 'phosphor-react'
import { toast } from 'react-toastify'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Textarea } from '../../components/Textarea'
import { TextInput } from '../../components/TextInput'
import { Avatar } from '../../components/Avatar'

import { useAuth } from '../../hooks/useAuth'
import { http } from '../../services/http'
import { errorHandler } from '../../utils/errorHandler'
import * as S from './styles'

const profileFormSchema = zod.object({
  bio: zod.string().nullable(),
})

type ProfileFormData = zod.infer<typeof profileFormSchema>

interface IUploadResponse {
  avatar: string
}

interface IUpdateBioResponse {
  bio: string
}

export function Profile() {
  const { user, updateProfile } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      bio: user?.bio ?? null,
    },
  })

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files

    if (!fileList) return

    try {
      const file = fileList[0]
      const formData = new FormData()
      formData.append('avatar', file)

      const response = await http.patch<IUploadResponse>('avatar', formData)
      updateProfile('avatar', response.data.avatar)

      toast.success('Foto de perfil atualizada com sucesso')
    } catch (err) {
      errorHandler(err)
    }
  }

  const handleUpdateProfile: SubmitHandler<ProfileFormData> = async (data) => {
    try {
      const response = await http.patch<IUpdateBioResponse>('users', data)
      updateProfile('bio', response.data.bio)

      toast.success('Bio atualizada com sucesso')
    } catch (err) {
      errorHandler(err)
    }
  }

  return (
    <S.Container>
      <Card>
        <S.Form onSubmit={handleSubmit(handleUpdateProfile)}>
          <S.Preview>
            <Avatar src={user?.avatar} alt={user?.username} size="lg" />

            <S.UploadButton htmlFor="upload-input">
              <Camera size={18} />
            </S.UploadButton>

            <S.InputFile
              type="file"
              id="upload-input"
              data-testid="upload-input"
              onChange={handleInputChange}
            />
          </S.Preview>

          <TextInput
            type="text"
            placeholder="Usuário"
            value={user?.username}
            disabled
          />

          <Textarea placeholder="Bio" {...register('bio')} />

          <Button type="submit" disabled={isSubmitting}>
            Salvar alterações
          </Button>
        </S.Form>
      </Card>
    </S.Container>
  )
}
