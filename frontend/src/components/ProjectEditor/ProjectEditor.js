import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Stack, Box } from '@chakra-ui/react'

import { project } from '../../reducers/projectReducer'
import { ReAreaChart } from '../Charts/AreaChart'
import { NewProjectForm } from './NewProjectForm'
import { EditProjectForm } from './EditProjectForm'

export const ProjectEditor = () => {
  const { pvgis, load } = useSelector((store) => store.project)
  const dispatch = useDispatch()

  const { id } = useParams()
  const isNewProject = id === 'new'

  useEffect(() => {
    if (!isNewProject) return
    dispatch(project.actions.reset())
  }, [isNewProject, dispatch])

  return (
    <Stack flexDir='column' spacing={'20px'} dir='column'>
      {isNewProject && <NewProjectForm />}
      {!isNewProject && <EditProjectForm id={id} />}

      {pvgis && (
        <Box w='100%' h='300px'>
          <ReAreaChart dataSeries={{ pvgis, load }} />
        </Box>
      )}
    </Stack>
  )
}
