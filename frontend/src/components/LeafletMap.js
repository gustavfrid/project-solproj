import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MapContainer, TileLayer, Marker, LayersControl, useMapEvents, useMap } from 'react-leaflet'
import styled from 'styled-components/macro'

import { mapProviders } from '../utils/mapProviders'
import { project } from '../reducers/project'

const MapWrapper = styled.div`
  width: 100%;
  height: 300px;
`

export const LeafletMap = () => {
  const position = useSelector(store => store.project.position)
  const dispatch = useDispatch()
  const markerRef = useRef(null)
  const ZOOM_LEVEL = 15

  const handleChangePosition = ({ lat, lng }) => {
    dispatch(project.actions.setPosition({ lat: lat, lng: lng }))
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
      <MapContainer center={position} zoom={ZOOM_LEVEL}>
        <ChangeView center={position} />
        <LayersControl position='topright'>
          <LayersControl.BaseLayer name='OpenStreetMap'>
            <TileLayer attribution={mapProviders.OSM.attribution} url={mapProviders.OSM.url} />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name='Esri.Satellite'>
            <TileLayer attribution={mapProviders.ESRI.attribution} url={mapProviders.ESRI.url} />
          </LayersControl.BaseLayer>
        </LayersControl>
        <Marker
          draggable
          position={position}
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
        <MapEvents />
      </MapContainer>
    </MapWrapper>
  )
}
