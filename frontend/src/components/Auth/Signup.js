import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Stack } from '@mui/material'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Signup = ({ handleSubmit, formState }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().min(5, 'Must be 5 characters or more').required('Required'),
      password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
    }),
    onSubmit: (values) => {
      handleSubmit(values)
    },
  })
  return (
    <Stack spacing={2} direction='column'>
      <Form onSubmit={formik.handleSubmit}>
        <TextField
          id='username'
          name='username'
          type='text'
          label='Username'
          error={formik.touched.username && formik.errors.username ? true : false}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          helperText={formik.touched.username && formik.errors.username ? formik.errors.username : ''}
        />
        <TextField
          id='password'
          name='password'
          type='password'
          label='Password'
          error={formik.touched.password && formik.errors.password ? true : false}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
        />
        <Button type='submit' variant='contained'>
          {formState}
        </Button>
      </Form>
    </Stack>
  )
}
