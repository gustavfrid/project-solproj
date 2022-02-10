import { Stack } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { Text } from '@chakra-ui/react'
import { FormHeading } from '../FormFields'
import { AdjustbleArrow } from '../../../assets/CustomIcons'
import { MapboxMapStatic } from '../../Location/MapboxMapStatic'

export const ProjectFormSummary = () => {
  const { values: formValues } = useFormikContext()
  const { projectName, systemSize, systemAzimuth, systemInclination, yearlyLoad, loadProfile } = formValues
  return (
    <Stack mb={5}>
      <Stack spacing={3} alignItems='flex-start' p={5} boxShadow='2xl' rounded='lg'>
        <FormHeading
          text={`Project name: ${projectName}`}
          subTitle={'Final step, just create project or go back if something is wrong.'}
        />
        <MapboxMapStatic height={[300, 400, 550]} position='relative'>
          <AdjustbleArrow angle={systemAzimuth} boxSize={200} color={'white'} strokeW={3} position='absolute' />
        </MapboxMapStatic>
        <Text>Size: {systemSize} kW</Text>
        <Text>Inclination: {systemInclination}&deg; </Text>
        <Text>Yearly consumption: {yearlyLoad} kWh</Text>
        <Text>Consumption profile: {loadProfile}</Text>
      </Stack>
    </Stack>
  )
}
