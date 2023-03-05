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
      <Listbox.Button className="shadow-stone-900` m-2 w-full border-4 border-stone-900 bg-violet-300 p-2 font-bold shadow-normal">
        <div className="flex justify-between">
          <span>{selected.text}</span>
          <span>&#9662;</span>
        </div>
      </Listbox.Button>
      <Listbox.Options className="shadow-stone-900` absolute m-2 mt-0 border-4 border-stone-900 bg-violet-300 font-bold shadow-normal">
        {options.map((v, k) => (
          <Listbox.Option
            key={k}
            value={v}
            className="p-2 ui-active:text-red-400"
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
