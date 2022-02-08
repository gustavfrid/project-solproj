import { Stack } from '@chakra-ui/react'
import { InputField } from '../FormFields/InputField'
import { MapboxMapEdit } from '../../Location/MapboxMapEdit'
import { useField } from 'formik'

export const ProjectInfoForm = (props) => {
  const {
    formField: { projectName, location },
  } = props
  const [, , helpers] = useField({ name: location.name, label: location.label })

  return (
    <Stack spacing={4}>
      <InputField name={projectName.name} label={projectName.label} />
      <MapboxMapEdit height={[300, 400]} position='relative' setFormikValue={helpers.setValue} />
      <InputField name={location.name} label={location.label} />
    </Stack>
  )
}
