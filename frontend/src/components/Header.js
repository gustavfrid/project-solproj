import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import Sun from '../assets/sun.png'

const HeaderContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
`
const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin: 5px;
`
const Logo = styled.img`
  width: 50px;
`

export const Header = () => {
  return (
    <HeaderContainer>
      <Logo src={Sun} alt='logo' />
      <h1>SolProj</h1>

      <LinkContainer>
        <NavLink to='/maps/MapLeafletDraw'>Leaflet-Draw</NavLink>
        <NavLink to='/maps/MapLeafletGeoman'>Leaflet-Geoman</NavLink>
        <NavLink to='/maps/MapReactLeaflet'>React-Leaflet</NavLink>
        <NavLink to='/maps/MapMapbox'>MapMapbox</NavLink>
        MapMapbox
      </LinkContainer>
    </HeaderContainer>
  )
}
