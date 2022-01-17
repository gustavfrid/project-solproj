import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
export const Start = () => {
  return (
    <Container>
      <h1>Welcome to SolProj</h1>
      <Link to='auth'>Start</Link>
    </Container>
  )
}
