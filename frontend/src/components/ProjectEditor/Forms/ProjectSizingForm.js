import { useFormikContext } from 'formik'
import { Stack, Center } from '@chakra-ui/react'
import { InputField, SliderInputField } from '../FormFields'
import { AdjustbleArrow, AdjustbleAngle } from '../../../assets/CustomIcons'

export const ProjectSizingForm = (props) => {
  const {
    formField: { projectSize, systemAzimuth, systemInclination, yearlyLoad },
  } = props
  const { values } = useFormikContext()

  return (
    <Stack spacing='20px'>
      <InputField name={projectSize.name} label={projectSize.label} type='number' />
      <Center>
        <AdjustbleArrow angle={values.systemAzimuth} boxSize={20} />
      </Center>
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
      <Stack direction='row' justify='center'>
        <AdjustbleAngle angle={values.systemInclination} boxSize={20} />
        <AdjustbleAngle angle={values.systemInclination} boxSize={20} />
        <AdjustbleAngle angle={values.systemInclination} boxSize={20} />
      </Stack>
      <SliderInputField
        name={systemInclination.name}
        aria-label={systemInclination.label}
        defaultValue={0}
        min={0}
        max={90}
        step={5}
        markers={[
          { v: 0, ml: -1 },
          { v: 15, ml: -2 },
          { v: 30, ml: -2 },
          { v: 40, ml: -2 },
          { v: 90, ml: -2 },
        ]}
      />
      <InputField name={yearlyLoad.name} label={yearlyLoad.label} type='number' />
    </Stack>
  )
}
