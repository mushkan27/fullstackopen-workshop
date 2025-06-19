import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  render(<Note note={note} />)

  // screen.debug() //prints the full HTML structure of the rendered component to console.

  const element = screen.getByText('Component testing is done with react-testing-library')

  screen.debug(element) //only prints the HTML of that specific element to console.
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = vi.fn()

  render(
    <Note note={note} updateNote={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('Change true')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})