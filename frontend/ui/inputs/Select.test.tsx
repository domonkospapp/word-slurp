import { fireEvent, render, screen } from '@testing-library/react'
import Select, { Option } from './Select'
import '@testing-library/jest-dom/extend-expect'

const options: Option[] = [
  { text: 'Option 1', value: '1' },
  { text: 'Option 2', value: '2' },
  { text: 'Option 3', value: '3' },
]

describe('Select', () => {
  it('renders the select component with each option', () => {
    options.forEach(async (option) => {
      const updateMock = jest.fn()
      render(<Select options={options} selected={option} update={updateMock} />)
      const actualButton = await screen.findByRole('button')
      expect(actualButton).toHaveTextContent(`${option.text}▾`)
    })
  })

  it('renders the select component with the correct props', async () => {
    const updateMock = jest.fn()
    const selectedOption = options[0]

    render(
      <Select options={options} selected={selectedOption} update={updateMock} />
    )

    const selectButton = screen.getByRole('button', {
      name: `${selectedOption.text} ▾`,
    })
    expect(selectButton).toBeInTheDocument()
    expect(selectButton).toHaveClass('bg-violet-300')

    fireEvent.click(selectButton)

    const optionsContainer = await screen.findByRole('listbox')
    expect(optionsContainer).toBeInTheDocument()

    options.forEach(async (option) => {
      const optionButton = await screen.findByRole('option', {
        name: option.text,
      })
      expect(optionButton).toBeInTheDocument()

      fireEvent.click(optionButton)
      expect(updateMock).toHaveBeenCalledWith(option)

      if (option === selectedOption) {
        expect(optionButton).toHaveAttribute('aria-selected', 'true')
        expect(optionButton).toHaveClass(
          'ui-active:bg-stone-900 ui-active:text-green-300'
        )
      } else {
        expect(optionButton).not.toHaveAttribute('aria-selected', 'true')
        expect(optionButton).not.toHaveClass(
          'ui-active:bg-stone-900 ui-active:text-green-300'
        )
      }
    })
  })

  it('disables the select component when disabled prop is passed', async () => {
    const updateMock = jest.fn()
    const selectedOption = options[0]

    render(
      <Select
        options={options}
        selected={selectedOption}
        update={updateMock}
        disabled={true}
      />
    )

    const selectButton = screen.getByRole('button', {
      name: `${selectedOption.text} ▾`,
    })
    expect(selectButton).toBeInTheDocument()
    expect(selectButton).toHaveClass('bg-stone-300')

    fireEvent.click(selectButton)

    const optionsContainer = screen.queryByRole('listbox')
    expect(optionsContainer).not.toBeInTheDocument()
  })
})
