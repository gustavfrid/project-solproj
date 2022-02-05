import { Stack } from '@chakra-ui/react'
import { InputField } from '../FormFields/InputField'

export const ProjectFormSummary = (props) => {
  const {
    formField: { projectName, projectSize },
  } = props

  return (
    <Stack spacing='20px'>
      <InputField name={projectName.name} label={projectName.label} />
      <InputField name={projectSize.name} label={projectSize.label} />
    </Stack>
  )
}
