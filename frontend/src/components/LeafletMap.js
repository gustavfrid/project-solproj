import React, { useState, useRef, useMemo, useEffect } from 'react'

import { MapContainer, TileLayer, Marker, LayersControl, useMapEvents, useMap } from 'react-leaflet'
import styled from 'styled-components'
import { mapProviders } from '../utils/mapProviders'
// import { LeafletControlGeocoder } from './LeafletControlGeocoder'
import { SearchBox } from './SearchBox'

const MapWrapper = styled.div`
  height: 600px;
  margin: auto;
  width: 100%;
`

export const LeafletMap = () => {
  const [position, setPosition] = useState({ lat: 59.32496507200476, lng: 18.070742255316343 })
  const markerRef = useRef(null)
  // const mapRef = useRef(null)

  const handleChangePosition = ({ lat, lng }) => {
    setPosition({ lat: lat, lng: lng })
    console.log('posistion changed')
  }

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          let newPosition = marker.getLatLng()
          handleChangePosition({ lat: newPosition.lat, lng: newPosition.lng })
          console.log('from marker', newPosition)
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

  // component to Change center
  const ChangeView = ({ center }) => {
    const map = useMap()
    map.flyTo(center)
    return null
  }

  return (
    <MapWrapper>
      <MapContainer center={position} zoom={11}>
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
        {/* <LeafletControlGeocoder setPosition={setPosition} /> */}
      </MapContainer>

      <SearchBox setPosition={setPosition} position={position} />

      <p>
        Latitude: {position.lat}, Longitude: {position.lng}
      </p>
    </MapWrapper>
  )
}
