import { useField } from 'formik'
import { Select, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'

export const SelectField = (props) => {
  const { label, options, ...rest } = props
  const [field, meta] = useField(props)

  return (
    <FormControl variant='floating' isInvalid={meta.error && meta.touched}>
      <Select {...field} {...rest} placeholder={label}>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <FormLabel htmlFor={label}>{label}</FormLabel>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}
