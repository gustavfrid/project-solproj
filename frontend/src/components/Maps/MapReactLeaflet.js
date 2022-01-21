import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MapContainer, TileLayer, Marker, LayersControl, useMapEvents, useMap } from 'react-leaflet'
// import Freedraw, { ALL } from 'react-leaflet-freedraw'
import styled from 'styled-components/macro'

import { mapProviders } from '../../utils/mapProviders'
import { project } from '../../reducers/project'

const MapWrapper = styled.div`
  width: 100%;
  height: 400px;
`

export const MapReactLeaflet = () => {
  const location = useSelector(store => store.project.location)
  const dispatch = useDispatch()
  const markerRef = useRef(null)
  // const freedrawRef = useRef(null)
  const ZOOM_LEVEL = 18

  const handleChangePosition = ({ lat, lng }) => {
    dispatch(project.actions.setLocation({ lat: lat, lng: lng }))
  }

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        handleChangePosition({ lat: e.latlng.lat, lng: e.latlng.lng })
      },
    })
    return false
  }

  // component to change center of map
  const ChangeView = ({ center }) => {
    const map = useMap()
    map.setView(center, ZOOM_LEVEL)
    return null
  }

  return (
    <MapWrapper>
      <MapContainer center={location} zoom={ZOOM_LEVEL}>
        <ChangeView center={location} />
        <LayersControl position='topright'>
          <LayersControl.BaseLayer name='OpenStreetMap'>
            <TileLayer attribution={mapProviders.OSM.attribution} url={mapProviders.OSM.url} />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name='Esri.Satellite'>
            <TileLayer attribution={mapProviders.ESRI.attribution} url={mapProviders.ESRI.url} />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name='Google'>
            <TileLayer
              attribution={mapProviders.GOOGLE.attribution}
              url={mapProviders.GOOGLE.url}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <Marker
          draggable
          position={location}
          ref={markerRef}
          eventHandlers={{
            dragend: () => {
              const marker = markerRef.current
              if (marker != null) {
                let newPosition = marker.getLatLng()
                handleChangePosition({ lat: newPosition.lat, lng: newPosition.lng })
                console.log('move position', newPosition)
              }
            },
          }}
        />
        {/* <Freedraw
          mode={ALL}
          eventHandlers={{
            markers: event =>
              console.log(
                'markers drawn - latLngs',
                event.latLngs,
                'Polygons:',
                freedrawRef.current.size()
              ),
            mode: event => console.log('mode changed', event),
          }}
          ref={freedrawRef}
        /> */}
        <MapEvents />
      </MapContainer>
    </MapWrapper>
  )
}
