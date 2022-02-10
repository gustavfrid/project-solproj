import { Stack } from '@chakra-ui/react'
import { InputField } from '../FormFields/InputField'
import { MapboxMapEdit } from '../../Location/MapboxMapEdit'
import { useField } from 'formik'

export const ProjectSizingForm = (props) => {
  const {
    formField: { systemSize },
  } = props
  const [, , helpers] = useField({ name: systemSize.name, label: systemSize.label })

  return (
    <Stack spacing={4} p={5} boxShadow='2xl' rounded='lg'>
      <MapboxMapEdit
        height={[300, 400]}
        position='relative'
        setFormikSizeValue={helpers.setValue}
        hasDrawControl={true}
        zoomControls={{ doubleClickZoom: false }}
      />
      <InputField name={systemSize.name} label={systemSize.label} />
    </Stack>
  )
}
