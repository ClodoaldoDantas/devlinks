import { Button } from '.'
import { render, screen } from '../../utils/test-utils'

describe('Button component', () => {
  it('should render correctly', () => {
    render(<Button>Entrar</Button>)
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })
})
