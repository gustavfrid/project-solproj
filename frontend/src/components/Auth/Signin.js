import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import {
  Stack,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export const Signin = ({ handleSubmit, initialRef, formState, onClose }) => {
  const [show, setShow] = useState(false)

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().min(5, 'Must be 5 characters or more').required('Required'),
        password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
      })}
      onSubmit={(values, actions) => {
        handleSubmit(values)
        onClose()
      }}>
      {(props) => (
        <Form>
          <Stack spacing='24px'>
            <Field name='username'>
              {({ field, form }) => (
                <FormControl variant='floating' isInvalid={form.errors.username && form.touched.username}>
                  <Input {...field} id='username' placeholder=' ' ref={initialRef} />
                  <FormLabel htmlFor='username'>Username</FormLabel>
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='password'>
              {({ field, form }) => (
                <FormControl variant='floating' isInvalid={form.errors.password && form.touched.password}>
                  <Input {...field} type={show ? 'text' : 'password'} id='password' placeholder=' ' />

                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  <InputRightElement alignContent='center'>
                    <IconButton
                      isActive={false}
                      variant='solid'
                      onClick={() => setShow(!show)}
                      aria-label='Show/Hide Password'
                      icon={show ? <ViewIcon /> : <ViewOffIcon />}
                    />
                  </InputRightElement>
                </FormControl>
              )}
            </Field>
            <Button mt={4} colorScheme='yellow' isLoading={props.isSubmitting} type='submit'>
              {formState.toUpperCase()}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
