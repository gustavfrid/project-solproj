import { useState } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
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
  useToast,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { user } from '../../reducers/userReducer'
import { API_URL } from '../../utils/constants'

export const Signin = ({ formState, onClose, initialRef }) => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const toast = useToast()

  const { loading } = useSelector((store) => store.user)

  const handleSubmit = async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
    dispatch(user.actions.setLoading(true))

    try {
      const response = await fetch(API_URL(formState), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.response)
      batch(() => {
        dispatch(user.actions.setUserId(data.response.userId))
        dispatch(user.actions.setUsername(data.response.username))
        dispatch(user.actions.setAccessToken(data.response.accessToken))
        dispatch(user.actions.setError(null))
      })
      resetForm({})
      if (formState === 'signup') {
        toast({
          title: `New user created, welcome!`,
          status: 'success',
          isClosable: true,
        })
      }
      // console.log(data)
    } catch (error) {
      batch(() => {
        dispatch(user.actions.setUserId(null))
        dispatch(user.actions.setUsername(null))
        dispatch(user.actions.setAccessToken(null))
        dispatch(user.actions.setError(error))
      })
      setStatus({ success: false })
      setSubmitting(false)
      setErrors({ submit: error })

      toast({
        title: `${error}`,
        status: 'error',
        isClosable: true,
      })
    }
    dispatch(user.actions.setLoading(false))
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().min(5, 'Must be 5 characters or more').required('Required'),
        password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
      })}
      onSubmit={(values, actions) => {
        // alert(JSON.stringify(values, null, 2))
        handleSubmit(values, actions)
        // onClose()
      }}>
      {(props) => (
        <Form>
          <Stack spacing='24px'>
            <Field name='username'>
              {({ field, form }) => (
                <FormControl variant='floating' isInvalid={form.errors.username && form.touched.username}>
                  <Input
                    {...field}
                    id='username'
                    placeholder=' '
                    ref={initialRef}
                    disabled={form.isSubmitting || props.disabled}
                  />
                  <FormLabel htmlFor='username'>Username</FormLabel>
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='password'>
              {({ field, form }) => (
                <FormControl variant='floating' isInvalid={form.errors.password && form.touched.password}>
                  <Input
                    {...field}
                    type={show ? 'text' : 'password'}
                    id='password'
                    placeholder=' '
                    disabled={form.isSubmitting || props.disabled}
                  />

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
            <Button mt={4} colorScheme='yellow' isLoading={loading} type='submit'>
              {formState.toUpperCase()}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
