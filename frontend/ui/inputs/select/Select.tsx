'use client'
import { Listbox } from '@headlessui/react'

type SelectProps = {
  options: Array<Option>
  selected: Option
  update: (value: Option) => void
  disabled?: boolean
}

const Select = ({ options, selected, update, disabled }: SelectProps) => {
  return (
    <Listbox value={selected} onChange={update} disabled={disabled}>
      <div className="relative mr-4">
        <Listbox.Button
          className={`${
            disabled ? 'bg-stone-300' : 'bg-violet-300'
          } m-2 w-full border-4 border-stone-900   p-2 font-bold shadow-normal shadow-stone-900`}
        >
          <div className="flex justify-between">
            <span>{selected.text}</span>
            <span>&#9662;</span>
          </div>
        </Listbox.Button>
        <Listbox.Options className="absolute z-50 mx-2 max-h-60 w-full overflow-auto border-4 border-stone-900 bg-violet-300 font-bold shadow-normal shadow-stone-900">
          {options.map((v, i) => (
            <Listbox.Option
              key={i}
              value={v}
              className="relative p-2 ui-active:bg-stone-900 ui-active:text-green-300"
            >
              {v.text}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}

export type Option = {
  text: string
  value: string
}

export default Select
