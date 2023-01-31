import { vi } from 'vitest'
import { ClipboardButton } from '.'
import { fireEvent, render, screen, userEvent } from '../../utils/test-utils'

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { username: 'johndoe' },
  }),
}))

describe('ClipboardButton component', () => {
  beforeEach(() => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    })
  })

  it('should render correctly', () => {
    render(<ClipboardButton />)

    expect(
      screen.getByRole('button', { name: /copiar url/i }),
    ).toBeInTheDocument()

    expect(screen.getByTestId('tooltip')).toBeInTheDocument()
    expect(screen.getByTestId('icon-link')).toBeInTheDocument()
  })

  it('should copy URL to clipboard', async () => {
    render(<ClipboardButton />)

    expect(screen.getByText('Copiar URL')).toBeInTheDocument()
    expect(screen.getByTestId('icon-link')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /copiar url/i }))

    const buttonCopied = screen.getByRole('button', { name: /copiado/i })

    expect(buttonCopied).toBeInTheDocument()
    expect(buttonCopied).toBeDisabled()
    expect(screen.getByText('Copiado!')).toBeInTheDocument()
    expect(screen.getByTestId('icon-check')).toBeInTheDocument()

    expect(screen.queryByRole('button', { name: /copiar url/i })).toBeNull()
    expect(screen.queryByTestId('icon-link')).toBeNull()
    expect(screen.queryByText('Copiar URL')).toBeNull()
  })

  it('should set "copied" equal to false in mouse leave event', async () => {
    render(<ClipboardButton />)

    await userEvent.click(screen.getByRole('button', { name: /copiar url/i }))

    expect(screen.getByText('Copiado!')).toBeInTheDocument()
    expect(screen.queryByText('Copiar URL')).toBeNull()

    fireEvent.mouseLeave(screen.getByRole('button', { name: /copiado/i }))

    expect(screen.queryByText('Copiado!')).toBeNull()
    expect(screen.getByText('Copiar URL')).toBeInTheDocument()
  })
})
