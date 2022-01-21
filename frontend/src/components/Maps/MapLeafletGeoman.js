import { useEffect } from 'react'
import L from 'leaflet'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import { mapProviders } from '../../utils/mapProviders'

export const MapLeafletGeoman = () => {
  useEffect(() => {
    const map = L.map('map', {
      center: [59.32496507200476, 18.070742255316343],
      zoom: 18,
      layers: [
        L.tileLayer(mapProviders.GOOGLE.url, {
          attribution: mapProviders.GOOGLE.attribution,
        }),
      ],
    })
    map.pm.setLang('sv')
    map.pm.addControls({
      position: 'topright',
      drawMarker: false,
      drawCircleMarker: false,
      drawCircle: false,
      drawPolyline: false,
      drawRectangle: true,
      drawPolygon: true,
      editMode: true,
      dragMode: true,
      cutPolygon: true,
    })
    return () => {
      map.remove()
    }
  }, [])

  return <div style={{ height: '400px' }} id='map'></div>
}
