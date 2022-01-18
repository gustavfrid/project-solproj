import React, { useState, useRef, useMemo } from 'react'

import { MapContainer, TileLayer, Marker, LayersControl, useMapEvents, useMap } from 'react-leaflet'
import styled from 'styled-components'
import { mapProviders } from '../utils/mapProviders'
import { SearchBox } from './SearchBox'

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
`

export const LeafletMap = () => {
  const [position, setPosition] = useState({ lat: 59.32496507200476, lng: 18.070742255316343 })
  const markerRef = useRef(null)
  const ZOOM_LEVEL = 15

  const handleChangePosition = ({ lat, lng }) => {
    setPosition({ lat: lat, lng: lng })
  }

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          let newPosition = marker.getLatLng()
          handleChangePosition({ lat: newPosition.lat, lng: newPosition.lng })
        }
      },
    }),
    []
  )

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition({ lat: e.latlng.lat, lng: e.latlng.lng })
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
        <Marker draggable position={position} ref={markerRef} eventHandlers={eventHandlers} />
        <MapEvents />
      </MapContainer>
      <SearchBox setPosition={setPosition} position={position} />
      <p>
        Latitude: {position.lat}, Longitude: {position.lng}
      </p>
    </MapWrapper>
  )
}
