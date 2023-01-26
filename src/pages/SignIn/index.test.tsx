import { SignIn } from '.'
import { render, screen, userEvent } from '../../utils/test-utils'

import { vi } from 'vitest'
import { server } from '../../mocks/server'
import { signInRequestFailure } from '../../mocks/handlers'
import * as useAuth from '../../hooks/useAuth'

const credentials = {
  username: 'johndoe',
  password: '123',
}

describe('SignUp page', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should render correctly', () => {
    render(<SignIn />)

    expect(screen.getByText('💻 DevLinks')).toBeInTheDocument()
    expect(
      screen.getByText('Tudo o que você é. Em um simples link.'),
    ).toBeInTheDocument()
  })

  it('should validate form fields', async () => {
    render(<SignIn />)

    const button = screen.getByRole('button', { name: /entrar/i })
    await userEvent.click(button)

    expect(screen.getAllByRole('alert')).toHaveLength(2)
  })

  it('should submit form when fields is valid', async () => {
    const signInFn = vi.fn()

    vi.spyOn(useAuth, 'useAuth').mockReturnValue({
      signIn: signInFn,
    } as any)

    render(<SignIn />)

    const inputUsername = screen.getByPlaceholderText('Usuário')
    const inputPassword = screen.getByPlaceholderText('Senha')
    const button = screen.getByRole('button', { name: /entrar/i })

    await userEvent.type(inputUsername, credentials.username)
    await userEvent.type(inputPassword, credentials.password)
    await userEvent.click(button)

    expect(signInFn).toHaveBeenCalledWith(credentials)
  })

  it('should display error if login fails', async () => {
    server.use(signInRequestFailure)
    render(<SignIn />)

    const inputUsername = screen.getByPlaceholderText('Usuário')
    const inputPassword = screen.getByPlaceholderText('Senha')
    const button = screen.getByRole('button', { name: /entrar/i })

    await userEvent.type(inputUsername, credentials.username)
    await userEvent.type(inputPassword, credentials.password)
    await userEvent.click(button)

    expect(
      await screen.findByText('usuário ou senha inválidos'),
    ).toBeInTheDocument()
  })
})
