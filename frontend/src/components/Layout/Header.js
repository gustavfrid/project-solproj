import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { user } from '../../reducers/userReducer'
import { project } from '../../reducers/projectReducer'
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
  const dispatch = useDispatch()

  const handleSignout = () => {
    dispatch(user.actions.reset())
    dispatch(project.actions.reset())
  }

  return (
    <HeaderContainer>
      <Logo src={Sun} alt='logo' />
      <h1>SolProj</h1>

      <LinkContainer>
        <NavLink to='/main/projects/new'>Create new project</NavLink>
        <NavLink onClick={() => dispatch(project.actions.reset())} to='/main/projects'>
          Project List
        </NavLink>
        <NavLink onClick={() => handleSignout()} to='/'>
          Signout
        </NavLink>
      </LinkContainer>
    </HeaderContainer>
  )
}
