import { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { getProjectList } from '../reducers/projectListReducer'
import { project, getHourlyData } from '../reducers/projectReducer'

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

  const projectList = useSelector((store) => store.projectList.projectList)

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

  return (
    <ListWrapper>
      <Autocomplete
        disablePortal
        autoHighlight
        onChange={(e, newValue) => navigate(`/main/projects/${newValue._id}`)}
        id='combo-box-demo'
        options={projectList}
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
            {projectList?.slice(0, 5).map((project) => (
              <TableRow
                key={project._id}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => handleSelectProject(project)}>
                <TableCell component='th' scope='row'>
                  {project.projectName}
                </TableCell>
                <TableCell align='right'>{project.systemSize}</TableCell>
                <TableCell align='right'>{project.systemAzimuth}</TableCell>
                <TableCell align='right'>{project.systemInclination}</TableCell>
                <TableCell align='right'>{moment(project.updatedAt).fromNow()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ListWrapper>
  )
}
