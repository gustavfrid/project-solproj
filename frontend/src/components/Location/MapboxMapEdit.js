import Map, { GeolocateControl, FullscreenControl, Marker } from 'react-map-gl'
import { Box } from '@chakra-ui/react'

import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { project } from '../../reducers/projectReducer'
import { GeocoderControl } from './Geocoder'

import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

export const MapboxMapEdit = (props) => {
  const mapStyle = useSelector((store) => store.project.mapStyle)
  const viewState = useSelector((store) => store.project.viewState)
  const location = useSelector((store) => store.project.location)
  const dispatch = useDispatch()

  const onMove = useCallback((evt) => {
    dispatch(project.actions.setViewState(evt.viewState))
  }, [])

  const handleMarkerLocation = (e) => {
    const newLocation = e.target._lngLat
    const newViewState = { ...viewState, longitude: newLocation.lng, latitude: newLocation.lat }

    dispatch(project.actions.setLocation([newLocation.lng, newLocation.lat]))
    dispatch(project.actions.setViewState(newViewState))
    if (props.setFormikValue) props.setFormikValue([newLocation.lng, newLocation.lat])
  }

  return (
    <Box w='100%' h={props.height} position={props.position} display='flex' justifyContent='center' alignItems='center'>
      <Map
        {...viewState}
        onMove={onMove}
        style={{ height: '100%' }}
        mapStyle={mapStyle}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
        <GeolocateControl position='bottom-right' />
        <FullscreenControl />
        <GeocoderControl
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          position='bottom-left'
          setFormikValue={props.setFormikValue}
        />
        <Marker
          longitude={location[0]}
          latitude={location[1]}
          anchor='bottom'
          draggable
          onDragEnd={handleMarkerLocation}
        />
      </Map>
      {props.children}
    </Box>
  )
}
