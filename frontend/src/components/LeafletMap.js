import React, { useState, useRef, useMemo } from 'react'

import { MapContainer, TileLayer, Marker, LayersControl, useMapEvents } from 'react-leaflet'
import styled from 'styled-components'
import { mapProviders } from '../utils/mapProviders'
// import { LeafletControlGeocoder } from './LeafletControlGeocoder'
import { SearchBox } from './SearchBox'

const MapWrapper = styled.div`
  height: 600px;
  margin: auto;
  width: 600px;
`
const LocationWrapper = styled.div`
  display: flex;
`

export const LeafletMap = () => {
  const [position, setPosition] = useState({ lat: 59.32496507200476, lng: 18.070742255316343 })
  const markerRef = useRef(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          let newPosition = marker.getLatLng()
          setPosition({ lat: newPosition.lat, lng: newPosition.lng })
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

  const onLocate = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
    })
  }

  return (
    <MapWrapper>
      <MapContainer center={position} zoom={11}>
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
      <LocationWrapper>
        <button onClick={onLocate}>My Location</button>
        <SearchBox setPosition={setPosition} position={position} />
      </LocationWrapper>
      <p>
        Latitude: {position.lat}, Longitude: {position.lng}
      </p>
    </MapWrapper>
  )
}
