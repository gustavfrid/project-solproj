import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Spinner, Center } from '@chakra-ui/react'

export const LoadingProject = () => {
  const { projectId } = useSelector((store) => store.project)
  const navigate = useNavigate()

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (projectId !== 'new') {
        navigate(`/main/projects/${projectId}`)
      }
    }, 500)
    return () => {
      clearTimeout(timeout)
    }
  }, [projectId, navigate])

  return (
    <Center h='90vh'>
      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
    </Center>
  )
}
