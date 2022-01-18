import styled from 'styled-components'

const StyledHeader = styled.h1`
  font-size: 20px;
`
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 25px;
`

export const Header = () => {
  return (
    <HeaderContainer>
      <StyledHeader>SolProj</StyledHeader>
    </HeaderContainer>
  )
}
