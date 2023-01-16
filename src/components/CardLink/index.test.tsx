import { vi } from 'vitest'
import { CardLink } from '.'
import { render, screen, userEvent } from '../../utils/test-utils'

const renderCardLink = () => {
  const data = {
    id: '1',
    label: 'Test',
    url: 'http://test.com',
  }

  const onDeleteMock = vi.fn()

  render(<CardLink data={data} onDelete={onDeleteMock} />)

  return { data, onDeleteMock }
}

describe('CardLink component', () => {
  it('should render correctly', () => {
    const { data } = renderCardLink()

    expect(screen.getByText(data.label)).toBeInTheDocument()
    expect(screen.getByText(data.url)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should call "onDelete" when button is clicked', async () => {
    const { onDeleteMock } = renderCardLink()
    const deleteButton = screen.getByRole('button')

    await userEvent.click(deleteButton)
    expect(onDeleteMock).toHaveBeenCalled()
  })
})
