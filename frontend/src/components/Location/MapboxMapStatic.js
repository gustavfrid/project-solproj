import Map, { Marker } from 'react-map-gl'
import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

export const MapboxMapStatic = (props) => {
  const mapStyle = useSelector((store) => store.project.mapStyle)
  const viewState = useSelector((store) => store.project.viewState)
  const location = useSelector((store) => store.project.location)

  return (
    <Box w='100%' h={props.height} position={props.position} display='flex' justifyContent='center' alignItems='center'>
      <Map
        {...viewState}
        dragPan={false}
        scrollZoom={false}
        boxZoom={false}
        doubleClickZoom={false}
        style={{ height: '100%' }}
        mapStyle={mapStyle}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
        <Marker longitude={location[0]} latitude={location[1]} anchor='bottom' />
      </Map>
      {props.children}
    </Box>
  )
}
