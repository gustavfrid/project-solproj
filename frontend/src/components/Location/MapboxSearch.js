import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

import { project } from '../../reducers/projectReducer'

// css modules for mapbox
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
// css module for geocoding
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

export const MapboxSearch = () => {
  const mapContainer = useRef(null)

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken, // Set the access token
    types: 'country,region,place,postcode,locality,neighborhood',
    placeholder: 'Search location', // Placeholder text for the search bar
    country: ['se'], // Boundary
  })
  let results = ''
  // Add geocoder result to container.
  geocoder.on('result', (e) => {
    results = JSON.stringify(e.result, null, 2)
  })

  // Clear results container when search is cleared.
  geocoder.on('clear', () => {
    results = ''
  })

  return (
    <>
      <div ref={mapContainer}></div>
      <div>{results}</div>
    </>
  )
}
