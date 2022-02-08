import { useField } from 'formik'
import {
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'

export const NumberField = (props) => {
  const { label, name, min, ...rest } = props
  const [field, meta] = useField(props)

  // TODO: what props should be spread on NumberInput & NumberInputField???
  return (
    <FormControl variant='floating' isInvalid={meta.error && meta.touched}>
      <NumberInput {...field} name={name} min={min} {...rest} placeholder=' '>
        <NumberInputField {...field} />
        <NumberInputStepper maxW='4'>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormLabel htmlFor={label}>{label}</FormLabel>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}
