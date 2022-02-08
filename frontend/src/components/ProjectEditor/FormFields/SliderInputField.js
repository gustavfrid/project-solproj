import { useState } from 'react'
import { useField } from 'formik'
import {
  Slider,
  SliderTrack,
  SliderThumb,
  SliderMark,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tooltip,
} from '@chakra-ui/react'

export const SliderInputField = (props) => {
  const { children, min, max, defaultValue, markers, step } = props
  const [field, , helpers] = useField(props)
  const [showTooltip, setShowTooltip] = useState(false)
  return (
    <HStack spacing='15px'>
      <Slider
        defaultValue={defaultValue}
        value={field.value}
        mb='4'
        mt='1'
        min={min}
        max={max}
        step={step}
        focusThumbOnChange={false}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onChange={(v) => helpers.setValue(v)}>
        <SliderTrack />
        <Tooltip hasArrow bg='teal.500' color='white' placement='top' isOpen={showTooltip} label={field.value}>
          <SliderThumb />
        </Tooltip>
        {markers.map((marker) => (
          <SliderMark key={marker.v} value={marker.v} mt='2' ml={marker.ml} fontSize='sm'>
            {marker.v}
          </SliderMark>
        ))}
        {children}
      </Slider>
      <NumberInput
        maxWidth='70px'
        mr='2rem'
        min={min}
        max={max}
        value={field.value}
        keepWithinRange
        onChange={(v) => helpers.setValue(v)}>
        <NumberInputField paddingLeft={2} paddingRight={2} />
        <NumberInputStepper maxW='4'>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  )
}
