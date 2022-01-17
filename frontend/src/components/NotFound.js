import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 260px;
  padding: 15px;
  margin: 0 auto;
  background-color: lightgrey;
  box-shadow: 5px 10px 18px #888888;
  border-radius: 6px;
  gap: 10px;
  & p {
    margin: 5px 0 15px 0;
  }

  @media (min-width: 375px) {
    max-width: 300px;
  }
  @media (min-width: 735px) {
    max-width: 600px;
  }
`
const StartOverButton = styled.button`
  height: 30px;
  border-radius: 6px;
  background-color: #d68c7c;
  margin-top: 30px;
  display: flex;
  align-items: center;
`

export const NotFound = () => {
  let navigate = useNavigate()
  const onRestart = () => {
    navigate('/')
  }

  return (
    <Container>
      <h1>Page not found</h1>
      <StartOverButton onClick={onRestart}>Go to Start</StartOverButton>
    </Container>
  )
}
