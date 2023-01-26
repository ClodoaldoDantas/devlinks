import { vi } from 'vitest'
import { Header } from '.'
import { render, screen, userEvent } from '../../utils/test-utils'

const signOutMock = vi.fn()

vi.mock('../../hooks/useAuth.ts', () => ({
  useAuth: () => ({
    user: {
      username: 'johndoe',
    },
    signOut: signOutMock,
  }),
}))

describe('Header component', () => {
  it('should render correctly', () => {
    render(<Header />)

    expect(screen.getByText('johndoe')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /sair da conta/i }),
    ).toBeInTheDocument()
  })

  it('should logout the user', async () => {
    render(<Header />)

    const logoutButton = screen.getByRole('button', { name: /sair da conta/i })
    await userEvent.click(logoutButton)

    expect(signOutMock).toHaveBeenCalled()
  })
})
