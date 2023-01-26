import { TextInput } from '.'
import { render, screen } from '../../utils/test-utils'

describe('TextInput component', () => {
  it('should render correctly', () => {
    render(<TextInput />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should display error message', () => {
    render(<TextInput error={{ message: 'required' } as any} />)
    expect(screen.getByText('required')).toBeInTheDocument()
  })
})
