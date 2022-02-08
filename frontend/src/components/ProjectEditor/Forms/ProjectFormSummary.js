import { Stack } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { Text } from '@chakra-ui/react'
import { FormHeading } from '../FormFields'
import { AdjustbleArrow } from '../../../assets/CustomIcons'
import { MapboxMap } from '../../Location/MapboxMap'

export const ProjectFormSummary = () => {
  const { values: formValues } = useFormikContext()
  const { projectName, systemSize, systemAzimuth, systemInclination, yearlyLoad, loadProfile } = formValues
  return (
    <Stack mb={5}>
      <Stack spacing={2} alignItems='flex-start'>
        <FormHeading text={`Project name: ${projectName}`} />
        <MapboxMap height={[300, 400]} position='relative'>
          <AdjustbleArrow angle={systemAzimuth} boxSize={200} color={'white'} strokeW={3} position='absolute' />
        </MapboxMap>
        <Text>Size: {systemSize} kW</Text>
        <Text>Inclination: {systemInclination}&deg; </Text>
        <Text>Yearly consumption: {yearlyLoad} kWh</Text>
        <Text>Consumption profile: {loadProfile}</Text>
      </Stack>
    </Stack>
  )
}
