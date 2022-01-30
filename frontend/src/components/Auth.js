import { useEffect, useState } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { user } from '../reducers/user'
import { API_URL } from '../utils/constants'

import { Signup } from './Auth/Signup'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
`

export const Auth = () => {
  const [formState, setFormState] = useState('signin')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector((store) => store.user.accessToken)
  //const loading = useSelector(store => store.user.loading)

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

  const handleSubmit = (values) => {
    dispatch(user.actions.setLoading(true))

    fetch(API_URL(formState), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
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
      <Signup handleSubmit={handleSubmit} formState={formState} />
      <div onClick={onChangeFormState}>
        {formState === 'signup' ? 'Already have an account? Signin!' : 'New user? Signup!'}
      </div>
    </Container>
  )
}
