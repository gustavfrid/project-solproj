import { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import moment from 'moment'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, IconButton, Center, Flex, Box } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

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
    <Flex justify='center'>
      <Center h='90vh' w='80vw'>
        <Box w='100%' border='1px solid' borderColor='gray.400' borderRadius='md' padding={2}>
          {projects.length === 0 ? (
            <Link to='/main/projects/new'>No projects, create a new one!</Link>
          ) : (
            <Table size='sm'>
              <TableCaption>Recent projects</TableCaption>
              <Thead>
                <Tr>
                  <Th>Project Name</Th>
                  <Th isNumeric>System Size</Th>
                  <Th>Updated</Th>
                  <Th>Edit</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {projects?.slice(0, 5).map((project) => (
                  <Tr key={project._id}>
                    <Td onClick={() => handleSelectProject(project)}>{project.projectName}</Td>
                    <Td isNumeric>{project.systemSize}</Td>
                    <Td>{moment(project.updatedAt).fromNow(true)}</Td>
                    <Td>
                      <IconButton
                        size='sm'
                        onClick={() => handleSelectProject(project)}
                        aria-label='Edit project'
                        icon={<EditIcon />}
                      />
                    </Td>
                    <Td>
                      <IconButton
                        size='sm'
                        onClick={() => handleDeleteProject(project._id)}
                        aria-label='Delete project'
                        icon={<DeleteIcon />}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Center>
    </Flex>
  )
}
