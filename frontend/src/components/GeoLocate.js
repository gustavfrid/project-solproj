import { useDispatch } from 'react-redux'
import styled from 'styled-components/macro'

import { project } from '../reducers/project'
import LocateSvg from '../assets/LocateIcon.svg'

const LocateIcon = styled.img`
  width: 20px;
  height: 20px;
`
export const GeoLocate = () => {
  const dispatch = useDispatch()

  const onLocate = () => {
    navigator.geolocation.getCurrentPosition(position => {
      dispatch(
        project.actions.setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      )
    })
  }
  return <LocateIcon src={LocateSvg} onClick={onLocate} />
}
