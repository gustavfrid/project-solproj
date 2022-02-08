import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Stack, useToast, Box } from '@chakra-ui/react'

import { project, createProject, updateProject } from '../../reducers/projectReducer'
// import { MapMapbox } from '../Location/MapMapbox'
// import { PvForm } from './PvForm'
// import { BarChart } from '../Charts/BarChart'
import { ReAreaChart } from '../Charts/AreaChart'
import { NewProjectForm } from './NewProjectForm'
import { EditProjectForm } from './EditProjectForm'

export const ProjectEditor = () => {
  const { pvgis, load, projectId, projectName } = useSelector((store) => store.project)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const { id } = useParams()
  const isNewProject = id === 'new'

  useEffect(() => {
    if (!isNewProject) return
    dispatch(project.actions.reset())
  }, [isNewProject, dispatch])

  const handleSaveProject = () => {
    if (isNewProject) {
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
    <Stack flexDir='column' spacing={'20px'} dir='column'>
      {isNewProject && <NewProjectForm handleSaveProject={handleSaveProject} />}
      {!isNewProject && <EditProjectForm handleSaveProject={handleSaveProject} />}

      {pvgis && (
        <Box w='100%' h='300px'>
          <ReAreaChart dataSeries={{ pvgis, load }} />
        </Box>
      )}
    </Stack>
  )
}
