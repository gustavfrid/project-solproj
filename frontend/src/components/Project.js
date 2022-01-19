import styled from 'styled-components'

import { LeafletMap } from './LeafletMap'
import { GeoLocate } from './GeoLocate'
import { SearchBox } from './SearchBox'

const Container = styled.div`
  display: flex;
  align-items: center;
`

export const Project = () => {
  return (
    <div>
      <h2>Create New Project</h2>
      <LeafletMap />
      <Container>
        <GeoLocate />
        <SearchBox />
      </Container>
    </div>
  )
}
