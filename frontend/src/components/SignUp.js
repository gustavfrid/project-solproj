import { useEffect, useState } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { user } from '../reducers/user'
import { API_URL } from '../utils/constants'

export const SignUp = () => {
  const [nameInput, setNameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector(store => store.user.accessToken)
  const loading = useSelector(store => store.user.loading)

  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate])

  const onSignUp = event => {
    event.preventDefault()
    dispatch(user.actions.setLoading(true))

    fetch(API_URL('signup'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: nameInput,
        password: passwordInput,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('signup response', data)
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
    <div>
      <form onSubmit={onSignUp}>
        <h1>Sign up</h1>
        <label htmlFor='nameInput'>Username</label>
        <input
          id='nameInput'
          type='text'
          placeholder='username'
          onChange={e => {
            setNameInput(e.target.value)
          }}
        />
        <label htmlFor='passwordInput'>Password</label>
        <input
          id='passwordInput'
          type='password'
          onChange={e => {
            setPasswordInput(e.target.value)
          }}
        />
        <button type='submit' value='Sign up'>
          Signup
        </button>
        <Link to='/'>Startpage</Link>
      </form>
    </div>
  )
}
