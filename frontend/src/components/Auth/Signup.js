import { useFormik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;
`

export const Signup = () => {
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().min(5, 'Must be at least 5 characters').required('Required'),
      password: Yup.string().min(8, 'Password needs to be at least 8 characters').required(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <h1>Sign up</h1>
      <label htmlFor='username'>Username</label>
      <input
        id='username'
        name='username'
        type='text'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null}
      <label htmlFor='password'>Password</label>
      <input
        id='password'
        name='password'
        type='text'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
      <button type='submit'>Submit</button>
    </FormContainer>
  )
}
