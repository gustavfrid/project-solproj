import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import * as turf from '@turf/turf'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import styled from 'styled-components'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

import { project } from '../../reducers/projectReducer'

// css modules for mapbox
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
// css module for geocoding
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

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

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

// TODO: make marker into separate component

export const MapMapbox = () => {
  const location = useSelector((store) => store.project.location)
  const mapContainer = useRef(null)
  const map = useRef(null)
  const dispatch = useDispatch()
  const [lng, setLng] = useState(location.coordinates.lng)
  const [lat, setLat] = useState(location.coordinates.lat)
  // const [area, setArea] = useState('0 m2')
  const [areas, setAreas] = useState([])
  const [zoom, setZoom] = useState(17)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: location.coordinates,
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
      // defaultMode: 'draw_polygon',
    })

    // Add the draw control to the map
    map.current.addControl(draw)

    const marker = new mapboxgl.Marker({ draggable: true }) // initialize a new marker
      .setLngLat(location.coordinates) // Marker [lng, lat] coordinates
      .addTo(map.current) // Add the marker to the map

    const onDragEnd = () => {
      const lngLat = marker.getLngLat()
      onChangeProjectLocation([lngLat.lng, lngLat.lat])
      setLng(lngLat.lng.toFixed(4))
      setLat(lngLat.lat.toFixed(4))
    }
    marker.on('dragend', onDragEnd)

    const updateArea = (e) => {
      const data = draw.getAll()

      console.log('updateArea: ', e.type, 'data:', JSON.parse(JSON.stringify(data)))
      if (data.features.length > 0) {
        const features = data.features.map((feature) => Math.round(turf.area(feature) * 100) / 100)
        setAreas(features)
      }
    }

    const geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: false, // Do not use the default marker style
      placeholder: 'Search location', // Placeholder text for the search bar
      country: ['se'], // Boundary
    })

    geocoder.on('result', (event) => {
      console.log('result event', event.result.geometry)
      console.log('marker data', marker)
      onChangeProjectLocation(event.result.geometry.coordinates)
      marker.setLngLat(event.result.geometry.coordinates)
      // map.current.getSource('single-point').setData(event.result.geometry)
    })

    const fullscreenControl = new mapboxgl.FullscreenControl()
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    })

    // Add the geocoder to the map
    map.current.addControl(geocoder, 'bottom-right') // Add the geocoder to the map
    map.current.addControl(fullscreenControl) // Add the fullscreen to the map
    map.current.addControl(geolocateControl, 'bottom-right') // Add the geolocate to the map

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

    map.current.on('load', () => {
      map.current.addSource('single-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      })

      map.current.addLayer({
        id: 'point',
        source: 'single-point',
        type: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#448ee4',
        },
      })

      // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
      //  Add a marker at the result's coordinates
    })
  })

  const onChangeProjectLocation = (coordinates) => {
    dispatch(project.actions.setLocation(coordinates))
  }

  return (
    <div>
      <MapContainer ref={mapContainer}>
        <Sidebar>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | {areas.map((area) => `Area: ${area} m2`)}
        </Sidebar>
      </MapContainer>
    </div>
  )
}
