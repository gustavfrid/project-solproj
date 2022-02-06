import { Stack } from '@chakra-ui/react'
import { NumberField, SliderInputField } from '../FormFields'

export const ProjectSizingForm = (props) => {
  const {
    formField: { projectSize, systemAzimuth },
  } = props

  return (
    <Stack spacing='20px'>
      <NumberField name={projectSize.name} label={projectSize.label} />
      <SliderInputField
        name={systemAzimuth.name}
        aria-label={systemAzimuth.label}
        defaultValue={0}
        min={-180}
        max={180}
        step={5}
        markers={[
          { v: -180, ml: -3 },
          { v: -90, ml: -3 },
          { v: 0, ml: -1 },
          { v: 90, ml: -2 },
          { v: 180, ml: -4 },
        ]}
      />
    </Stack>
  )
}
