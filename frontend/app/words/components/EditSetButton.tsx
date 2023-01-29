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
    <Button
      onClick={editSet}
      color={isEditing ? 'bg-green-300' : 'bg-violet-300'}
    >
      {isEditing ? 'Save' : 'Edit'}
    </Button>
  )
}
export default EditSetButton
