import { Stack } from '@chakra-ui/react'
import { InputField } from '../FormFields/InputField'

export const ProjectInfoForm = (props) => {
  const {
    formField: { projectName },
  } = props

  return (
    <Stack spacing='20px'>
      <InputField name={projectName.name} label={projectName.label} />
    </Stack>
  )
}
