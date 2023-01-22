import { SignUp } from '.'
import { render, screen, userEvent } from '../../utils/test-utils'

import { vi } from 'vitest'
import * as router from 'react-router'
import { server } from '../../mocks/server'
import { signUpRequestFailure } from '../../mocks/handlers'

const navigate = vi.fn()

describe('SignUp page', () => {
  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  it('should render correctly', () => {
    render(<SignUp />)

    expect(screen.getByText('💻 DevLinks')).toBeInTheDocument()
    expect(
      screen.getByText('Tudo o que você é. Em um simples link.'),
    ).toBeInTheDocument()
  })

  it('should validate form fields', async () => {
    render(<SignUp />)

    const button = screen.getByRole('button', { name: /cadastrar/i })
    await userEvent.click(button)

    expect(screen.getAllByRole('alert')).toHaveLength(2)
  })

  it('should submit form when fields is valid', async () => {
    render(<SignUp />)

    const inputUsername = screen.getByPlaceholderText('Usuário')
    const inputPassword = screen.getByPlaceholderText('Senha')
    const textareaBio = screen.getByPlaceholderText('Bio')
    const button = screen.getByRole('button', { name: /cadastrar/i })

    await userEvent.type(inputUsername, 'johndoe')
    await userEvent.type(inputPassword, '123')
    await userEvent.type(textareaBio, 'software developer')
    await userEvent.click(button)

    const sucessMessage =
      'Cadastro realizado com sucesso! Faça login para continuar'

    expect(await screen.findByText(sucessMessage)).toBeInTheDocument()
    expect(navigate).toHaveBeenCalledWith('/')
  })

  it('should display error message if submit fails', async () => {
    server.use(signUpRequestFailure)
    render(<SignUp />)

    const inputUsername = screen.getByPlaceholderText('Usuário')
    const inputPassword = screen.getByPlaceholderText('Senha')
    const button = screen.getByRole('button', { name: /cadastrar/i })

    await userEvent.type(inputUsername, 'johndoe')
    await userEvent.type(inputPassword, '123')
    await userEvent.click(button)

    const errorMessage = 'Usuário já cadastrado'
    expect(await screen.findByText(errorMessage)).toBeInTheDocument()
  })
})
