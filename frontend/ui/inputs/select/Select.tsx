'use client'
import { Listbox } from '@headlessui/react'

const Select = ({
  options,
  selected,
  update,
}: {
  options: Array<Option>
  selected: Option
  update: (value: Option) => void
}) => {
  return (
    <Listbox value={selected} onChange={update}>
      <Listbox.Button className="m-2 w-full border-4 border-stone-900 bg-violet-300 p-2 font-bold shadow-normal shadow-stone-900">
        <div className="flex justify-between">
          <span>{selected.text}</span>
          <span>&#9662;</span>
        </div>
      </Listbox.Button>
      <Listbox.Options className="absolute ml-2 border-4 border-stone-900 bg-violet-300 font-bold shadow-normal shadow-stone-900">
        {options.map((v) => (
          <Listbox.Option
            key={v.value}
            value={v}
            className="p-2 ui-active:bg-stone-900 ui-not-active:bg-green-300"
          >
            {v.text}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export type Option = {
  text: string
  value: string
}

export default Select
