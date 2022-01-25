import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getProjectList } from '../reducers/projects'

export const ProjectList = () => {
  const dispatch = useDispatch()

  const projectList = useSelector((store) => store.projectList.projectList)

  useEffect(() => {
    console.log('project list mounted')
    dispatch(getProjectList())
    console.log('projectlist reponse', projectList)
  }, [dispatch, projectList])

  return (
    <ul>
      {projectList?.map((project) => (
        <li key={project._id}>{project.projectName}</li>
      ))}
    </ul>
  )
}
