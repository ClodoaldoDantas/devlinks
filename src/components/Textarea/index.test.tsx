import { Textarea } from '.'
import { render, screen } from '../../utils/test-utils'

describe('Textarea component', () => {
  it('should render correctly', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should display error message', () => {
    render(<Textarea error={{ message: 'required' } as any} />)
    expect(screen.getByText('required')).toBeInTheDocument()
  })
})
