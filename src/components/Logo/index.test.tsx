import { Logo } from '.'
import { render, screen } from '../../utils/test-utils'

describe('Logo component', () => {
  it('should render correctly', () => {
    render(<Logo />)
    expect(screen.getByText('💻 DevLinks')).toBeInTheDocument()
  })
})
