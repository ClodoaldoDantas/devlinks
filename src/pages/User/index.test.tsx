import { UserPage } from '.'
import { userMock } from '../../mocks/data'
import { getUserPageRequestFailure } from '../../mocks/handlers'
import { server } from '../../mocks/server'
import { render, screen, waitFor } from '../../utils/test-utils'

describe('User page', () => {
  it('should render loading', () => {
    render(<UserPage />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('should render user information', async () => {
    render(<UserPage />)

    await waitFor(() => {
      expect(screen.getByText(userMock.username)).toBeInTheDocument()
      expect(screen.getByText(userMock.bio)).toBeInTheDocument()
    })
  })

  it('should render links', async () => {
    render(<UserPage />)

    await waitFor(() => {
      expect(screen.getAllByTestId('user-link')).toHaveLength(2)
    })
  })

  it('should render footer', async () => {
    render(<UserPage />)

    await waitFor(() => {
      expect(screen.getByText('feito com 💜 por')).toBeInTheDocument()

      const githubLinkElement = screen.getByRole('link', {
        name: /clodoaldo dantas/i,
      })

      const githubLinkHref = 'https://github.com/clodoaldodantas'

      expect(githubLinkElement).toBeInTheDocument()
      expect(githubLinkElement).toHaveAttribute('href', githubLinkHref)
    })
  })

  it('should display message if user not found', async () => {
    server.use(getUserPageRequestFailure)
    render(<UserPage />)

    await waitFor(() => {
      expect(screen.getByText('Nenhum usuário encontrado')).toBeInTheDocument()
    })
  })
})
