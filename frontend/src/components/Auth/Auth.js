import { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Signup } from './Signup'
import { Signin } from './Signin'

import { user } from '../../reducers/user'
import { API_URL } from '../../utils/constants'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const Auth = () => {
  const [formState, setFormState] = useState('signin')
  const navigate = useNavigate()
  const accessToken = useSelector((store) => store.user.accessToken)
  const loading = useSelector((store) => store.user.loading)

  useEffect(() => {
    if (accessToken) {
      navigate('/main/projects')
    }
  }, [accessToken, navigate])

  // needed for submitting from redux
  const dispatch = useDispatch()

  const onChangeFormState = () => {
    if (formState === 'signin') {
      setFormState('signup')
    } else if (formState === 'signup') {
      setFormState('signin')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(user.actions.setLoading(true))

    fetch(API_URL('signup'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'username test formik',
        password: 'password test fromik',
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
      .finally(dispatch(user.actions.setLoading(false)))
  }

  return (
    <Container>
      <Signup />
      <p onClick={onChangeFormState}>
        {formState === 'signin' ? 'Create an account? Signup!' : 'Already user? Sign in!'}
      </p>
    </Container>
  )
}
