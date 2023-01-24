import { SignIn } from '.'
import { render, screen, userEvent } from '../../utils/test-utils'

import { vi } from 'vitest'

const mockSignInFn = vi.fn()

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    signIn: mockSignInFn,
  }),
}))

describe('SignUp page', () => {
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
    render(<SignIn />)

    const credentials = {
      username: 'johndoe',
      password: '123',
    }

    const inputUsername = screen.getByPlaceholderText('Usuário')
    const inputPassword = screen.getByPlaceholderText('Senha')
    const button = screen.getByRole('button', { name: /entrar/i })

    await userEvent.type(inputUsername, credentials.username)
    await userEvent.type(inputPassword, credentials.password)
    await userEvent.click(button)

    expect(mockSignInFn).toHaveBeenCalledWith(credentials)
  })
})
