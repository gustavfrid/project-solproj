import { useNavigate } from 'react-router-dom'
import { Center, Stack, Heading, Button } from '@chakra-ui/react'
import HeroImage from '../assets/hero_img.jpg'

export const Start = () => {
  const navigate = useNavigate()
  return (
    <Center h='100vh' bgImage={HeroImage} bgPosition='center' bgRepeat='no-repeat' bgSize='cover'>
      <Stack align='center' spacing='10'>
        <Heading as='h1' textAlign='center' fontSize={{ base: '35px', md: '48px', lg: '62px' }}>
          {'Welcome to SolProj'.toUpperCase()}
        </Heading>
        <Button variant='solid' size='lg' w='30%' onClick={() => navigate('/login')}>
          Start
        </Button>
      </Stack>
    </Center>
  )
}
