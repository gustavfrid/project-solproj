import { Link } from 'react-router-dom'
import styled from 'styled-components'

const List = styled.div`
  display: flex;
  flex-direction: column;
`

export const Maps = () => {
  return (
    <List>
      <Link to={'/maps/MapLeafletDraw'}>Leaflet-Draw</Link>
      <Link to={'/maps/LeafletGeoman'}>Leaflet-Geoman</Link>
      <Link to={'/maps/ReactLeaflet'}>React-Leaflet</Link>
    </List>
  )
}
