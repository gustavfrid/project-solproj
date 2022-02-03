import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import styled from 'styled-components'
import { project, createProject, updateProject } from '../../reducers/projectReducer'
import { MapMapbox } from '../Location/MapMapbox'
import { PvForm } from './PvForm'
import { BarChart } from './BarChart'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px;
  gap: 20px;
`

export const ProjectEditor = () => {
  const { pvgis, load, projectId, projectName } = useSelector((store) => store.project)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  let { id } = useParams()

  useEffect(() => {
    if (id === 'new') {
      dispatch(project.actions.reset())
    }
  }, [id, dispatch])

  const onSaveProject = () => {
    if (id === 'new') {
      dispatch(createProject())
      navigate('/main/projects/loading') // navigating to a loading site, could be handled by loader in ui?
    } else {
      dispatch(updateProject(id))
    }
  }

  return (
    <Container>
      <h2>{projectId === 'new' ? 'Create New Project' : projectName}</h2>
      <h3>Select location</h3>
      <MapMapbox />
      <PvForm />

      <Button variant='contained' onClick={() => onSaveProject()}>
        {id === 'new' ? 'Create project' : 'Save project'}
      </Button>
      {pvgis && <BarChart dataSeries={{ pvgis, load }} />}
    </Container>
  )
}
