import { vi } from 'vitest'
import { Profile } from '.'
import { render, screen, userEvent } from '../../utils/test-utils'

import { defaultErrorMessage } from '../../utils/errorHandler'
import {
  updateBioRequestFailure,
  uploadAvatarRequestFailure,
} from '../../mocks/handlers'

import { server } from '../../mocks/server'
import { userMock } from '../../mocks/data'
import * as useAuth from '../../hooks/useAuth'

describe('Profile page', () => {
  it('should render correctly', () => {
    render(<Profile />)

    expect(screen.getByTestId('upload-input')).toBeInTheDocument()
    expect(screen.getByTestId('avatar')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Usuário')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Bio')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /salvar alterações/i }),
    ).toBeInTheDocument()
  })

  it('should set values in inputs', () => {
    vi.spyOn(useAuth, 'useAuth').mockReturnValue({
      user: userMock,
    } as any)

    render(<Profile />)

    const inputUsername = screen.getByPlaceholderText('Usuário')
    const inputBio = screen.getByPlaceholderText('Bio')

    expect(inputUsername).toHaveValue(userMock.username)
    expect(inputBio).toHaveValue(userMock.bio)
  })

  it('should set input username disabled', () => {
    render(<Profile />)

    const inputUsername = screen.getByPlaceholderText('Usuário')
    expect(inputUsername).toBeDisabled()
  })

  it('should upload avatar', async () => {
    const updateProfileFn = vi.fn()

    vi.spyOn(useAuth, 'useAuth').mockReturnValue({
      updateProfile: updateProfileFn,
    } as any)

    render(<Profile />)

    const fakeAvatar = new File(['avatar'], 'avatar.png', { type: 'image/png' })
    const inputFile = screen.getByTestId('upload-input')

    await userEvent.upload(inputFile, fakeAvatar)

    expect(updateProfileFn).toHaveBeenCalledWith(
      'avatar',
      'http://test.com/avatar.png',
    )

    expect(
      await screen.findByText('Foto de perfil atualizada com sucesso'),
    ).toBeInTheDocument()
  })

  it('should display error if upload fails', async () => {
    server.use(uploadAvatarRequestFailure)
    render(<Profile />)

    const fakeAvatar = new File(['avatar'], 'avatar.png', { type: 'image/png' })
    const inputFile = screen.getByTestId('upload-input')

    await userEvent.upload(inputFile, fakeAvatar)

    expect(await screen.findByText(defaultErrorMessage)).toBeInTheDocument()
  })

  it('should update bio', async () => {
    const updateProfileFn = vi.fn()

    vi.spyOn(useAuth, 'useAuth').mockReturnValue({
      updateProfile: updateProfileFn,
    } as any)

    render(<Profile />)

    const inputBio = screen.getByPlaceholderText('Bio')
    const button = screen.getByRole('button', { name: /salvar alterações/i })

    await userEvent.type(inputBio, 'bio updated')
    await userEvent.click(button)

    expect(updateProfileFn).toHaveBeenCalledWith('bio', 'bio updated')

    expect(
      await screen.findByText('Bio atualizada com sucesso'),
    ).toBeInTheDocument()
  })

  it('should display error if update bio fails', async () => {
    server.use(updateBioRequestFailure)
    render(<Profile />)

    const inputBio = screen.getByPlaceholderText('Bio')
    const button = screen.getByRole('button', { name: /salvar alterações/i })

    await userEvent.type(inputBio, 'bio updated')
    await userEvent.click(button)

    expect(await screen.findByText(defaultErrorMessage)).toBeInTheDocument()
  })
})
