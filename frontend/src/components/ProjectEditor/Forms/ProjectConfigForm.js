import { useFormikContext } from 'formik'
import { Stack, Grid, GridItem } from '@chakra-ui/react'
import { InputField, SliderInputField, SelectField, FormHeading } from '../FormFields'
import { AdjustbleArrow, AdjustbleRoofAngle } from '../../../assets/CustomIcons'
import { MapboxMapStatic } from '../../Location/MapboxMapStatic'

export const ProjectConfigForm = (props) => {
  const {
    formField: { systemSize, systemAzimuth, systemInclination, yearlyLoad, loadProfile },
  } = props
  const { values } = useFormikContext()

  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={5}>
      <GridItem colSpan={[4, 4, 4, 2]} rowSpan={[1, 1, 1, 2]} p={5} boxShadow='2xl' rounded='lg'>
        <Stack direction='column' spacing={3}>
          <FormHeading
            text={'Roof orientation'}
            subTitle={'Rotate the arrow in the direction where the roof is leaning, use the slider below.'}
          />
          <MapboxMapStatic height={[300, 400]} position='relative'>
            <AdjustbleArrow
              angle={values.systemAzimuth}
              boxSize={200}
              color={'white'}
              strokeW={3}
              position='absolute'
            />
          </MapboxMapStatic>
          <SliderInputField
            name={systemAzimuth.name}
            aria-label={systemAzimuth.label}
            defaultValue={0}
            min={-180}
            max={180}
            step={1}
            markers={[
              { v: -180, ml: -3 },
              { v: -90, ml: -3 },
              { v: 0, ml: -1 },
              { v: 90, ml: -2 },
              { v: 180, ml: -4 },
            ]}
          />
        </Stack>
      </GridItem>

      <GridItem colSpan={[4, 4, 2]} p={5} boxShadow='2xl' rounded='lg'>
        <Stack direction='column' spacing={3}>
          <FormHeading text={'Roof inclination'} subTitle={'Set the roof inclination, use the slider below.'} />
          <AdjustbleRoofAngle angle={values.systemInclination} width={'100%'} height={200} />
          <SliderInputField
            name={systemInclination.name}
            aria-label={systemInclination.label}
            defaultValue={30}
            min={0}
            max={90}
            step={5}
            markers={[
              { v: 0, ml: -1 },
              { v: 5, ml: -1 },
              { v: 10, ml: -2 },
              { v: 15, ml: -2 },
              { v: 20, ml: -2 },
              { v: 25, ml: -2 },
              { v: 30, ml: -2 },
              { v: 35, ml: -2 },
              { v: 40, ml: -2 },
              { v: 45, ml: -2 },
              { v: 50, ml: -2 },
              { v: 60, ml: -2 },
              { v: 70, ml: -2 },
              { v: 90, ml: -2 },
            ]}
          />
        </Stack>
      </GridItem>
      <GridItem colSpan={[4, 4, 2]} p={5} boxShadow='2xl' rounded='lg'>
        <Stack direction='column' spacing={3}>
          <FormHeading
            text={'Consumption data'}
            subTitle={'Set your consumption data & profile to get all the fancy charts.'}
          />
          <InputField name={yearlyLoad.name} label={yearlyLoad.label} type='number' />
          <SelectField
            name={loadProfile.name}
            label={loadProfile.label}
            options={[
              { value: 'domestic', label: 'Domestic' },
              { value: 'townhouse', label: 'Townhouse' },
            ]}
          />
        </Stack>
      </GridItem>
    </Grid>
  )
}
