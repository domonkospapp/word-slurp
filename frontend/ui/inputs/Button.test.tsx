import { render, fireEvent, screen } from '@testing-library/react'
import Button from './Button'
import '@testing-library/jest-dom/extend-expect'

describe('Button component', () => {
  it('should render a button element with the correct props', () => {
    const mockOnClick = jest.fn()
    const color = 'bg-green-500'
    const buttonText = 'Click me!'
    render(
      <Button onClick={mockOnClick} color={color}>
        {buttonText}
      </Button>
    )

    const buttonElement = screen.getByText(buttonText)
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveClass(
      `m-2 border-4 border-stone-900 ${color} p-2 font-bold shadow-normal shadow-stone-900`
    )
    expect(buttonElement).not.toBeDisabled()

    fireEvent.click(buttonElement)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should render a disabled button element', () => {
    const mockOnClick = jest.fn()
    const color = 'bg-red-500'
    const buttonText = 'Disabled button'
    const { getByText } = render(
      <Button onClick={mockOnClick} color={color} disabled>
        {buttonText}
      </Button>
    )

    const buttonElement = getByText(buttonText)
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toBeDisabled()

    fireEvent.click(buttonElement)
    expect(mockOnClick).not.toHaveBeenCalled()
  })
})
