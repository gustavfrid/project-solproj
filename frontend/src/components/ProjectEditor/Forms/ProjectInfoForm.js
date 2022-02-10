import { Stack } from '@chakra-ui/react'
import { InputField, FormHeading } from '../FormFields'
import { MapboxMapEdit } from '../../Location/MapboxMapEdit'
import { useField } from 'formik'

export const ProjectInfoForm = (props) => {
  const {
    formField: { projectName, location },
  } = props
  const [, , helpers] = useField({ name: location.name, label: location.label })

  return (
    <Stack spacing={4} p={5} boxShadow='2xl' rounded='lg'>
      <FormHeading
        text={'Location & Name'}
        subTitle={'Name the project and find the location by address or moving the marker.'}
      />
      <InputField name={projectName.name} label={projectName.label} />
      <MapboxMapEdit
        height={[300, 400]}
        position='relative'
        setFormikLocationValue={helpers.setValue}
        hasGeocoder={true}
        hasGeolocate={true}
      />
      <InputField name={location.name} label={location.label} />
    </Stack>
  )
}
