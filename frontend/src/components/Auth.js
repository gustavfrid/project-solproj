import { useEffect, useState } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
// import Visibility from '@mui/icons-material/Visibility'
// import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { user } from '../reducers/user'
import { API_URL } from '../utils/constants'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;
`

export const Auth = () => {
  const [nameInput, setNameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [formState, setFormState] = useState('signin')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector((store) => store.user.accessToken)
  //const loading = useSelector(store => store.user.loading)

  // ----------------------mui test
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  // ----------------------mui test

  useEffect(() => {
    if (accessToken) {
      navigate('/main/projects')
    }
  }, [accessToken, navigate])

  const onChangeFormState = () => {
    if (formState === 'signin') {
      setFormState('signup')
    } else if (formState === 'signup') {
      setFormState('signin')
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    dispatch(user.actions.setLoading(true))

    fetch(API_URL(formState), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: nameInput,
        password: passwordInput,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('signup/signin response', data)
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId))
            dispatch(user.actions.setUsername(data.response.username))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            dispatch(user.actions.setError(null))
          })
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setUsername(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setError(data.response))
          })
        }
      })
      .then(setNameInput(''))
      .then(setPasswordInput(''))
      .finally(dispatch(user.actions.setLoading(false)))
  }

  return (
    <Container>
      <FormContainer onSubmit={onSubmit}>
        <h1>{formState === 'signin' ? 'Sign in' : 'Sign up '}</h1>
        <label htmlFor='nameInput'>Username</label>
        <input
          id='nameInput'
          type='text'
          placeholder='username'
          value={nameInput}
          onChange={(e) => {
            setNameInput(e.target.value)
          }}
        />
        <label htmlFor='passwordInput'>Password</label>
        <input
          id='passwordInput'
          type='password'
          placeholder='password'
          value={passwordInput}
          onChange={(e) => {
            setPasswordInput(e.target.value)
          }}
        />
        <button type='submit'>{formState}</button>
        <p onClick={onChangeFormState}>
          {formState === 'signin' ? 'Create an account? Signup!' : 'Already user? Sign in!'}
        </p>
      </FormContainer>
      <TextField
        error
        id='outlined-error-helper-text'
        label='Error'
        defaultValue='Hello World'
        helperText='Incorrect entry.'
      />{' '}
      <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
        <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
        <OutlinedInput
          id='outlined-adornment-password'
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'>
                {values.showPassword ? 'v' : 'm'}
              </IconButton>
            </InputAdornment>
          }
          label='Password'
        />
      </FormControl>
    </Container>
  )
}
