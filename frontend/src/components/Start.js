import { useNavigate } from 'react-router-dom'
import { Center, Stack, Heading, Button, Text } from '@chakra-ui/react'
import HeroImage from '../assets/hero_img.jpg'

export const Start = () => {
  const navigate = useNavigate()
  return (
    <Center h='100vh' bgImage={HeroImage} bgPosition='center' bgRepeat='no-repeat' bgSize='cover'>
      <Stack align='center' spacing={5} background='whiteAlpha.700' p={5} boxShadow='lg' rounded='lg'>
        <Heading as='h1' textAlign='center' fontSize={{ base: '35px', md: '48px', lg: '62px' }}>
          {'Welcome to SolProj'.toUpperCase()}
        </Heading>
        <Text align='center' fontSize={18}>
          Click start to create an account and your first solar project.
        </Text>
        <Button variant='solid' size='lg' w='30%' colorScheme={'yellow'} onClick={() => navigate('/login')}>
          Start
        </Button>
      </Stack>
    </Center>
  )
}
