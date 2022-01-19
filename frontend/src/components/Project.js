import styled from 'styled-components'

import { LeafletMap } from './LeafletMap'
import { GeoLocate } from './GeoLocate'
import { SearchBox } from './SearchBox'
import { PvForm } from './PvForm'

const Container = styled.div`
  display: flex;
  align-items: center;
`

export const Project = () => {
  return (
    <div>
      <h2>Create New Project</h2>
      <h3>Select location</h3>
      <LeafletMap />
      <Container>
        <GeoLocate />
        <SearchBox />
      </Container>
      <h3>System setup</h3>
      <PvForm />
    </div>
  )
}
