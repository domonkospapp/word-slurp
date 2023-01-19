'use client'

import Input from '../../../ui/inputs/Input'

const WordFilter = () => {
  return (
    <Input
      onChange={(e) => {
        console.log(e)
      }}
      value={'asd'}
      fullWidth
    />
  )
}
export default WordFilter
