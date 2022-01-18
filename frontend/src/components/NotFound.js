import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const NotFound = () => {
  let navigate = useNavigate()
  const onRestart = () => {
    navigate('/')
  }

  return (
    <Container>
      <h1>Page not found</h1>
      <button onClick={onRestart}>Go to Start</button>
    </Container>
  )
}
