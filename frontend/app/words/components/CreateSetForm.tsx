import { ChangeEvent, useState } from 'react'
import Button from '../../../ui/inputs/Button'
import Input from '../../../ui/inputs/Input'

const CreateSetForm = ({
  originalLanguage,
  foreignLanguage,
}: {
  originalLanguage: string | undefined
  foreignLanguage: string | undefined
}) => {
  const [setName, setSetName] = useState<string>('')

  const setNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSetName(e.target.value)
  }

  const createWordSet = async () => {
    await fetch('/api/wordSets/create', {
      method: 'POST',
      body: JSON.stringify({
        name: setName,
        originalLanguage: originalLanguage,
        foreignLanguage: foreignLanguage,
      }),
    })
  }

  const createIsDisabled = !(
    originalLanguage &&
    foreignLanguage &&
    setName != ''
  )

  return (
    <>
      <Input value={setName} onChange={setNameChange} />
      <Button
        color="bg-pink-200"
        onClick={createWordSet}
        disabled={createIsDisabled}
      >
        Create
      </Button>
    </>
  )
}

export default CreateSetForm
