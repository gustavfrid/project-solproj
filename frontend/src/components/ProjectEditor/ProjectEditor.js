import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Stack, useToast, Box } from '@chakra-ui/react'
import { project, createProject, updateProject } from '../../reducers/projectReducer'
import { MapMapbox } from '../Location/MapMapbox'
import { PvForm } from './PvForm'
import { BarChart } from '../Charts/BarChart'
import { ReAreaChart } from '../Charts/AreaChart'

export const ProjectEditor = () => {
  const { pvgis, load, projectId, projectName } = useSelector((store) => store.project)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  let { id } = useParams()
  const toast = useToast()

  useEffect(() => {
    if (id === 'new') {
      dispatch(project.actions.reset())
    }
  }, [id, dispatch])

  const onSaveProject = () => {
    if (id === 'new') {
      dispatch(createProject())
      navigate('/main/projects/loading') // navigating to a loading site, could be handled by loader in ui?

      //TODO: set toast according to response from backend
      toast({
        title: `Success project created!`,
        status: 'success',
        isClosable: true,
      })
    } else {
      dispatch(updateProject(id))
    }
  }

  return (
    <Stack flexDir='column' margin={8} spacing={'20px'} dir='column'>
      <h2>{projectId === 'new' ? 'Create New Project' : projectName}</h2>
      <h3>Select location</h3>
      <MapMapbox />
      <PvForm />
      <Button variant='contained' onClick={() => onSaveProject()}>
        {id === 'new' ? 'Create project' : 'Save project'}
      </Button>
      {pvgis && <BarChart dataSeries={{ pvgis, load }} />}

      {pvgis && (
        <Box w='100%' h='300px'>
          <ReAreaChart dataSeries={{ pvgis, load }} />
        </Box>
      )}
    </Stack>
  )
}
