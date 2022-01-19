import styled from 'styled-components'

import { LeafletMap } from './LeafletMap'
import { GeoLocate } from './GeoLocate'
import { SearchBox } from './SearchBox'

const Container = styled.div`
  display: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  /* margin: 0 auto; */
`
const SectionContainer = styled.div`
  height: 300px;
`

export const Project = () => {
  return (
    <div>
      <Container>
        <h2>Create New Project</h2>
        <SectionContainer>
          <h3>Select location</h3>
          <LeafletMap />
        </SectionContainer>
      </Container>
      <GeoLocate />
      <SearchBox />
    </div>
  )
}
