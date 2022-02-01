import { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components'
import {
  TextField,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

import { projectList, getProjectList } from '../reducers/projectListReducer'
import { project, getHourlyData, deleteProject } from '../reducers/projectReducer'

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 800px;
  width: 600px;
  margin: 0 auto;
  gap: 50px;
`

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
    <ListWrapper>
      <Autocomplete
        disablePortal
        autoHighlight
        onChange={(e, newValue) => handleSelectProject(newValue)}
        id='combo-box-demo'
        options={projects}
        getOptionLabel={(option) => option.projectName}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label='Search project' />}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>Project name</TableCell>
              <TableCell align='right'>Power</TableCell>
              <TableCell align='right'>Azimuth</TableCell>
              <TableCell align='right'>Inclination</TableCell>
              <TableCell align='right'>Changed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects?.slice(0, 5).map((project) => (
              <TableRow key={project._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row' onClick={() => handleSelectProject(project)}>
                  {project.projectName}
                </TableCell>
                <TableCell align='right'>{project.systemSize}</TableCell>
                <TableCell align='right'>{project.systemAzimuth}</TableCell>
                <TableCell align='right'>{project.systemInclination}</TableCell>
                <TableCell align='right'>{moment(project.updatedAt).fromNow()}</TableCell>
                <TableCell align='right' onClick={() => handleDeleteProject(project._id)}>
                  X
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ListWrapper>
  )
}
