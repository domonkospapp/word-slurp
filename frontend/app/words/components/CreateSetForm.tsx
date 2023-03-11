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
    <div className="grid grid-cols-2">
      <div className="col-span-1">
        <Input value={setName} onChange={setNameChange} />
      </div>
      <div className="col-span-1">
        <Button
          color="bg-pink-200"
          onClick={createWordSet}
          disabled={createIsDisabled}
        >
          Create
        </Button>
      </div>
    </div>
  )
}

export default CreateSetForm
