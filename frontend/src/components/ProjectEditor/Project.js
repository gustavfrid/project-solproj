import styled from 'styled-components'

import { ProjectName } from './ProjectName'
import { MapMapbox } from '../Location/MapMapbox'
import { GeoLocate } from '../Location/GeoLocate'
import { SearchBox } from '../Location/SearchBox'
import { PvForm } from './PvForm'

const Container = styled.div`
  display: flex;
  align-items: center;
`

export const Project = () => {
  return (
    <div>
      <h2>Create New Project</h2>
      <h3>Project name</h3>
      <ProjectName />
      <h3>Select location</h3>
      <MapMapbox />
      <Container>
        <GeoLocate />
        <SearchBox />
      </Container>
      <h3>System setup</h3>
      <PvForm />
    </div>
  )
}
