import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import * as turf from '@turf/turf'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import styled from 'styled-components'

// css modules for mapbox
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

const MapContainer = styled.div`
  height: 500px;
`
const Sidebar = styled.div`
  position: absolute;
  padding: 6px 12px;
  top: 0;
  left: 0;
  margin: 12px;
  border-radius: 4px;
  background-color: rgba(35, 55, 75, 0.9);
  font-family: monospace;
  color: #fff;
  z-index: 1;
`

mapboxgl.accessToken = process.env.REACT_APP_NOT_SECRET_CODE

export const MapMapbox = () => {
  const location = useSelector(store => store.project.location)
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(location.lng)
  const [lat, setLat] = useState(location.lat)
  // const [area, setArea] = useState('0 m2')
  const [areas, setAreas] = useState([])
  const [zoom, setZoom] = useState(16)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [lng, lat],
      zoom: zoom,
    })
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true,
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      defaultMode: 'draw_polygon',
    })
    map.current.addControl(draw)
    const updateArea = e => {
      const data = draw.getAll()

      console.log('updateArea', data.features)
      if (data.features.length > 0) {
        const features = data.features.map(feature => Math.round(turf.area(feature) * 100) / 100)
        setAreas(features)
        // const area = turf.area(data)

        // Restrict the area to 2 decimal points.
        // const rounded_area = Math.round(area * 100) / 100
        // setArea(rounded_area + ' m2')
      }
      // else {
      //   if (e.type !== 'draw.delete') setArea('Click the map to draw a polygon.')
      // }
      // if (e.type === 'draw.delete') setArea('0 m2')
    }
    map.current.on('draw.create', updateArea)
    map.current.on('draw.delete', updateArea)
    map.current.on('draw.update', updateArea)
  })

  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  })

  return (
    <div>
      <MapContainer ref={mapContainer}>
        <Sidebar>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | {areas.map(area => `Area: ${area} `)}
        </Sidebar>
      </MapContainer>
    </div>
  )
}
