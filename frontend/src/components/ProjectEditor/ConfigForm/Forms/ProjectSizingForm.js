import { Stack } from '@chakra-ui/react'
import { InputField } from '../FormFields/InputField'

export const ProjectSizingForm = (props) => {
  const {
    formField: { projectSize },
  } = props

  return (
    <Stack spacing='20px'>
      <InputField name={projectSize.name} label={projectSize.label} />
    </Stack>
  )
}
