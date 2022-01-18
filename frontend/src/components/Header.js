import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Sun from '../assets/sun.png'

const HeaderContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      <nav>
        <Link to='map'>Map</Link>
        <Link to='project'>Project</Link>
      </nav>
    </HeaderContainer>
  )
}
