import { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Box, Divider, HStack, IconButton, Center } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

import { projectList, getProjectList } from '../reducers/projectListReducer'
import { project, getHourlyData, deleteProject } from '../reducers/projectReducer'

export const ProjectList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const projects = useSelector((store) => store.projectList.projects)

  useEffect(() => {
    dispatch(getProjectList())
  }, [dispatch])

  const handleSelectProject = (selected) => {
    console.log(selected)
    batch(() => {
      dispatch(project.actions.setProjectId(project._id))
      dispatch(project.actions.setLocation(selected.location.coordinates))
      dispatch(project.actions.setProjectName(selected.projectName))
      dispatch(project.actions.setSystemSize(selected.systemSize))
      dispatch(project.actions.setSystemAzimuth(selected.systemAzimuth))
      dispatch(project.actions.setSystemInclination(selected.systemInclination))
      dispatch(project.actions.setYearlyLoad(selected.yearlyLoad))
      dispatch(project.actions.setPvgis(selected.pvgis))
    })
    dispatch(getHourlyData('domestic', 'loadProfile'))

    navigate(`/main/projects/${selected._id}`)
  }

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id))
    dispatch(projectList.actions.deletProjectFromList(id))
  }

  return (
    <Center>
      <HStack size='sm' spacing={2}>
        {projects?.map((project) => (
          <HStack key={project._id}>
            <Box onClick={() => handleSelectProject(project)}>{project.projectName}</Box>
            <Divider orientation='vertical' />
            <Box>{project.systemSize}</Box>
            <Divider orientation='vertical' />
            <Box>{moment(project.updatedAt).fromNow()}</Box>
            <Divider orientation='vertical' />
            <IconButton
              onClick={() => handleDeleteProject(project._id)}
              aria-label='Delete project'
              icon={<DeleteIcon />}
            />
          </HStack>
        ))}
      </HStack>
    </Center>
  )
}
