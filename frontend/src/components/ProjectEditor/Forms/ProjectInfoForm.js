import { Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { InputField } from '../FormFields/InputField'
import { MapboxSimple } from '../../Location/MapboxSimple'

export const ProjectInfoForm = (props) => {
  const {
    formField: { projectName, projectLocation },
  } = props
  const location = useSelector((store) => store.project.location.coordinates)

  return (
    <Stack spacing='20px'>
      <MapboxSimple />
      <InputField name={projectLocation.name} label={projectLocation.label} value={location.join(', ')} />
      <InputField name={projectName.name} label={projectName.label} />
    </Stack>
  )
}
