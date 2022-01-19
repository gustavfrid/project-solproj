// import styled from 'styled-components'

import { LeafletMap } from './LeafletMap'
import { GeoLocate } from './GeoLocate'
import { SearchBox } from './SearchBox'

// const Container = styled.div`
//   display: none;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   height: 100vh;
// `

export const Project = () => {
  return (
    <div>
      <h2>Create New Project</h2>
      <LeafletMap />
      <GeoLocate />
      <SearchBox />
    </div>
  )
}
