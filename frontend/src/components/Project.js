import styled from 'styled-components'

import { LeafletMap } from './LeafletMap'

const Container = styled.div`
  display: flex;
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
    <Container>
      <h2>Create New Project</h2>
      <SectionContainer>
        <h3>Select location</h3>
        <LeafletMap />
      </SectionContainer>
    </Container>
  )
}
