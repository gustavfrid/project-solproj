import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { getProjectList } from '../reducers/projects'

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const List = styled.ul`
  list-style-type: none;
  width: 500px;
`
const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
`

export const ProjectList = () => {
  const dispatch = useDispatch()

  const projectList = useSelector((store) => store.projectList.projectList)

  useEffect(() => {
    console.log('project list mounted')
    dispatch(getProjectList())
    console.log('projectlist reponse', projectList)
  }, [dispatch, projectList])

  return (
    <ListWrapper>
      <List>
        {projectList?.map((project) => (
          <ListItem key={project._id}>
            <div>Project name: {project.projectName}</div> <div>Size: {project.systemSize} kW</div>
          </ListItem>
        ))}
      </List>
    </ListWrapper>
  )
}
