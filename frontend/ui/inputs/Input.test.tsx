import { render, fireEvent, screen } from '@testing-library/react'
import Input from './Input'
import '@testing-library/jest-dom/extend-expect'

describe('Input component', () => {
  it('should render an input element with the correct props', () => {
    const mockOnChange = jest.fn()
    render(<Input onChange={mockOnChange} value="" />)

    const inputElement = screen.getByRole('textbox')

    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', 'text')
    expect(inputElement).toHaveAttribute('value', '')

    fireEvent.change(inputElement, { target: { value: 'Hello' } })
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object))
  })

  it('should call onKeyDown handler when a key is pressed', () => {
    const mockOnKeyDown = jest.fn()
    const { getByPlaceholderText } = render(
      <Input onChange={jest.fn()} value="" onKeyDown={mockOnKeyDown} />
    )

    const inputElement = getByPlaceholderText('Type in...')
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })
    expect(mockOnKeyDown).toHaveBeenCalledTimes(1)
    expect(mockOnKeyDown).toHaveBeenCalledWith(expect.any(Object))
  })
})
