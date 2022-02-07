import { Stack } from '@chakra-ui/react'
import { InputField } from '../FormFields/InputField'
import { MapboxSearch } from '../../Location/MapboxSearch'

export const ProjectInfoForm = (props) => {
  const {
    formField: { projectName },
  } = props

  return (
    <Stack spacing='20px'>
      <MapboxSearch />
      <InputField name={projectName.name} label={projectName.label} />
    </Stack>
  )
}
