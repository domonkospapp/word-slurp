'use client'

import { useEffect, useMemo, useState } from 'react'
import { WordSet } from '../../../types/word-set'
import Select, { Option } from '../../../ui/inputs/select/Select'

const WordSetSelection = ({
  wordSets,
  initialValue,
  update,
  disabled,
}: {
  wordSets: Array<WordSet>
  initialValue?: WordSet
  update: (wordSetId: number | undefined) => void
  autoUpdate?: boolean
  disabled?: boolean
}) => {
  const convertToOption = (wordSet: WordSet | undefined) => {
    return {
      text: wordSet?.name || '-',
      value: wordSet?.id.toString() || '',
    }
  }

  const getInitialOption = () => convertToOption(initialValue)

  const [selected, setSelected] = useState<Option>(getInitialOption)

  useEffect(() => {
    setSelected(getInitialOption)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue])

  const changeOption = (value: Option) => {
    setSelected(value)
    const setId = value.value == '' ? undefined : parseInt(value.value)
    update(setId)
  }

  const getOptions = () => {
    const options: Array<Option> = wordSets.map(convertToOption)
    options.unshift(convertToOption(undefined))
    return options
  }

  const options: Array<Option> = useMemo(getOptions, [wordSets])

  return (
    <Select
      options={options}
      selected={selected}
      update={changeOption}
      disabled={disabled}
    />
  )
}

export default WordSetSelection
