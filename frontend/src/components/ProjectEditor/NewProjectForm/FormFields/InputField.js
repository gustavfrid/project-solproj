import { useField } from 'formik'
import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'

export const InputField = (props) => {
  const { label, ...rest } = props
  const [field, meta] = useField(props)

  return (
    <FormControl variant='floating' isInvalid={meta.error && meta.touched}>
      <Input {...field} {...rest} placeholder=' ' />
      <FormLabel htmlFor={label}>{label}</FormLabel>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}
