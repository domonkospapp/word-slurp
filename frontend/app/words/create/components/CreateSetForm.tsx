import { ChangeEvent, useState } from 'react'
import Button from '../../../../ui/inputs/Button'
import Input from '../../../../ui/inputs/Input'

const CreateSetForm = () => {
  const [setName, setSetName] = useState<string>('')

  const setNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSetName(e.target.value)
  }

  const createWordSet = async () => {
    await fetch('/api/wordSet/create', {
      method: 'POST',
      body: JSON.stringify({
        name: setName,
        originalLanguage: 'hu',
        foreignLanguage: 'de',
      }),
    })
  }

  return (
    <>
      <Input value={setName} onChange={setNameChange} />
      <Button color="bg-pink-200" onClick={createWordSet}>
        Create
      </Button>
    </>
  )
}

export default CreateSetForm
