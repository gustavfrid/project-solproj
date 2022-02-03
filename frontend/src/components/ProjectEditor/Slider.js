import { useState } from 'react'
import { useField } from 'formik'
import {
  Slider,
  SliderTrack,
  SliderThumb,
  SliderMark,
  HStack,
  FormLabel,
  FormErrorMessage,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Tooltip,
} from '@chakra-ui/react'

export const CustomSlider = ({ children, ...props }) => {
  const [field, meta, helpers] = useField({ ...props })
  const { max, min } = props
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <HStack spacing='15px'>
      <Slider
        {...props}
        value={field.value}
        mb='4'
        mt='1'
        // focusThumbOnChange={false}
        // onFocus={() => setShowTooltip(true)}
        // onFocusOut={() => setShowTooltip(false)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onChange={(v) => helpers.setValue(v)}>
        <SliderTrack />
        <Tooltip hasArrow bg='teal.500' color='white' placement='top' isOpen={showTooltip} label={field.value}>
          <SliderThumb />
        </Tooltip>

        {props.markers.map((marker) => (
          <SliderMark key={marker.v} value={marker.v} mt='2' ml={marker.ml} fontSize='sm'>
            {marker.v}
          </SliderMark>
        ))}
        {children}
      </Slider>
      <NumberInput
        maxWidth='80px'
        mr='2rem'
        min={min}
        max={max}
        value={field.value}
        keepWithinRange
        onChange={(v) => helpers.setValue(v)}>
        <NumberInputField />
        <NumberInputStepper maxW='4'>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  )
}
