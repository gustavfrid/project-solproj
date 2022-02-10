import { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import moment from 'moment'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, IconButton, Center, Flex, Stack, Text } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

import { projectList, getProjectList } from '../reducers/projectListReducer'
import { project, getHourlyData, deleteProject } from '../reducers/projectReducer'

export const ProjectList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [listSize, setListSize] = useState(5)

  const projects = useSelector((store) => store.projectList.projects)

  useEffect(() => {
    dispatch(getProjectList())
    dispatch(project.actions.reset())
  }, [dispatch])

  const toggleListSize = () => {
    if (listSize === 5) setListSize(50)
    if (listSize === 50) setListSize(5)
  }

  const handleSelectProject = (selected) => {
    batch(() => {
      dispatch(project.actions.setProjectId(selected._id))
      dispatch(project.actions.setLocation(selected.location))
      dispatch(project.actions.setProjectName(selected.projectName))
      dispatch(project.actions.setSystemSize(selected.systemSize))
      dispatch(project.actions.setSystemAzimuth(selected.systemAzimuth))
      dispatch(project.actions.setSystemInclination(selected.systemInclination))
      dispatch(project.actions.setYearlyLoad(selected.yearlyLoad))
      dispatch(project.actions.setLoadProfile(selected.loadProfile))
      dispatch(project.actions.setPvgis(selected.pvgis))
      dispatch(getHourlyData(selected.loadProfile, 'loadProfile'))
      dispatch(getHourlyData('SE3', 'spotPrice'))
    })

    navigate(`/main/projects/${selected._id}`)
  }

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id))
    dispatch(projectList.actions.deletProjectFromList(id))
  }

  return (
    <Flex justify='center'>
      <Center h='90vh'>
        {projects.length === 0 ? (
          <Link to='/main/projects/new'>
            <Text fontSize='2xl'>No projects, create a new one!</Text>
          </Link>
        ) : (
          <Table size='sm' p={3} boxShadow='2xl' rounded='lg'>
            <TableCaption onClick={toggleListSize}>
              <Text fontSize={12}>
                {listSize} most recent projects, click{' '}
                <Text as='span' color='pink.400'>
                  here
                </Text>{' '}
                to show {listSize === 5 ? 'more' : 'less'}
              </Text>
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Project</Th>
                <Th isNumeric>Size kW</Th>
                <Th>Updated</Th>
                <Th>Edit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects?.slice(0, listSize).map((project) => (
                <Tr key={project._id}>
                  <Td onClick={() => handleSelectProject(project)}>
                    <Text isTruncated maxW={['80px', '150px', '350px', '500px']}>
                      {project.projectName}
                    </Text>
                  </Td>
                  <Td isNumeric>{project.systemSize}</Td>
                  <Td>
                    <Text isTruncated maxW={['80px', '80px', 'revert']}>
                      {moment(project.updatedAt).fromNow()}
                    </Text>
                  </Td>
                  <Td>
                    <Stack direction='row' spacing={1}>
                      <IconButton
                        size='sm'
                        onClick={() => handleSelectProject(project)}
                        aria-label='Edit project'
                        icon={<EditIcon />}
                      />
                      <IconButton
                        size='sm'
                        onClick={() => handleDeleteProject(project._id)}
                        aria-label='Delete project'
                        icon={<DeleteIcon />}
                      />
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Center>
    </Flex>
  )
}
