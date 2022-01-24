import { useDispatch } from 'react-redux'
import styled from 'styled-components/macro'

import { project } from '../../reducers/project'
import LocateSvg from '../../assets/LocateIcon.svg'

const LocateIcon = styled.img`
  width: 20px;
  height: 20px;
`
export const GeoLocate = () => {
  const dispatch = useDispatch()

  const onLocate = () => {
    navigator.geolocation.getCurrentPosition((location) => {
      dispatch(
        project.actions.setLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        })
      )
    })
  }
  return <LocateIcon src={LocateSvg} onClick={onLocate} />
}
