import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
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
    dispatch(getProjectList())
  }, [dispatch])

  return (
    <ListWrapper>
      <List>
        {projectList?.map((project) => (
          <ListItem key={project._id}>
            <Link to={`${project._id}`}>Project name: {project.projectName}</Link>
            <div>Updated: {moment(project.updatedAt).fromNow()}</div> <div>Size: {project.systemSize} kW</div>
          </ListItem>
        ))}
      </List>
    </ListWrapper>
  )
}
