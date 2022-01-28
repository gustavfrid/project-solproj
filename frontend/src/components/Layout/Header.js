import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import Sun from '../../assets/sun.png'

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
        <NavLink to='/main/projects/new'>Create new project</NavLink>
        <NavLink to='/main/projects'>Project List</NavLink>
      </LinkContainer>
    </HeaderContainer>
  )
}
