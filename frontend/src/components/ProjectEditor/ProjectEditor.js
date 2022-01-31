import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { project, createProject, getProject, updateProject } from '../../reducers/projectReducer'

import { ProjectName } from './ProjectName'
import { MapMapbox } from '../Location/MapMapbox'
import { PvForm } from './PvForm'
import { BarChart } from './BarChart'
// import { LineChart } from './LineChart'

export const ProjectEditor = () => {
  const { pvgis, load } = useSelector((store) => store.project)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  let { id } = useParams()

  useEffect(() => {
    if (id === 'new') {
      dispatch(project.actions.reset())
    } else {
      dispatch(getProject(id))
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
    <div>
      <h2>Create New Project</h2>
      <h3>Project name</h3>
      <ProjectName />
      <h3>Select location</h3>
      <MapMapbox />
      <h3>System setup</h3>
      <PvForm />
      <button onClick={() => onSaveProject()}>{id === 'new' ? 'Create project' : 'Save project'}</button>
      {pvgis && <BarChart dataSeries={{ pvgis, load }} />}
      {/* {pvgis && <LineChart dataSeries={pvgis} />} */}
    </div>
  )
}
