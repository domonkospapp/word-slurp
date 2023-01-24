'use client'
import Button from '../../../ui/inputs/Button'

const EditSetButton = ({
  editSet,
  isEditing,
}: {
  editSet: () => void
  isEditing: boolean
}) => {
  return (
    <Button onClick={editSet} color="bg-pink-200">
      {isEditing ? 'Save' : 'Edit'}
    </Button>
  )
}
export default EditSetButton
