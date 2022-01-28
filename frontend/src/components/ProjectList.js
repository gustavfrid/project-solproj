import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  const projectList = useSelector((store) => store.projectList.projectList)

  useEffect(() => {
    dispatch(getProjectList())
  }, [dispatch])

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
      {/* <List>
        {projectList?.slice(0, 5).map((project) => (
          <ListItem key={project._id}>
            <Link to={`${project._id}`}>Project name: {project.projectName}</Link>
            <div>{moment(project.updatedAt).fromNow()}</div>
          </ListItem>
        ))}
      </List> */}
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
                onClick={() => navigate(`/main/projects/${project._id}`)}>
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
