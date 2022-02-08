import { Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { InputField } from '../FormFields/InputField'
import { MapboxMapEdit } from '../../Location/MapboxMapEdit'

export const ProjectInfoForm = (props) => {
  const {
    formField: { projectName, projectLocation },
  } = props
  const location = useSelector((store) => store.project.location.coordinates)

  return (
    <Stack spacing={4}>
      <InputField name={projectName.name} label={projectName.label} />
      <MapboxMapEdit height={[300, 400]} position='relative' />
      <InputField name={projectLocation.name} label={projectLocation.label} value={location.join(', ')} />
    </Stack>
  )
}
