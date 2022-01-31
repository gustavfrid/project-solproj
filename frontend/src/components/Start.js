import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@mui/material'

import HeroImage from '../assets/hero_img.jpg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${(props) => props.img});
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
`
const Header = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 50px;
`

export const Start = () => {
  const navigate = useNavigate()
  return (
    <Container img={HeroImage}>
      <Header>{'Welcome to SolProj'.toUpperCase()}</Header>
      <Button variant='contained' onClick={() => navigate('/login')}>
        Start
      </Button>
    </Container>
  )
}
