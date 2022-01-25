import { useDispatch } from 'react-redux'

import { saveProject } from '../../reducers/project'

import { ProjectName } from './ProjectName'
import { MapMapbox } from '../Location/MapMapbox'
import { PvForm } from './PvForm'

export const Project = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Create New Project</h2>
      <h3>Project name</h3>
      <ProjectName />
      <h3>Select location</h3>
      <MapMapbox />
      <h3>System setup</h3>
      <PvForm />
      <button onClick={() => dispatch(saveProject())}>Save project</button>
    </div>
  )
}
