import { useEffect } from 'react'
import L from 'leaflet'
// import { Marker } from 'leaflet-draw'
import { mapProviders } from '../../utils/mapProviders'

export const MapLeafletDraw = () => {
  useEffect(() => {
    const map = L.map('map').setView([59.32496507200476, 18.070742255316343], 18)
    L.tileLayer(mapProviders.GOOGLE.url, {
      attribution: mapProviders.GOOGLE.attribution,
    }).addTo(map)
    const editableLayers = new L.FeatureGroup()
    map.addLayer(editableLayers)
    const drawPluginOptions = {
      position: 'topright',
      draw: {
        polyline: {
          shapeOptions: {
            color: '#f357a1',
            weight: 10,
          },
        },
        polygon: {
          allowIntersection: true, // Restricts shapes to simple polygons
          drawError: {
            color: '#e1e100', // Color the shape will turn when intersects
            message:
              '<strong>Polygon draw does not allow intersections!<strong> (allowIntersection: false)', // Message that will show when intersect
          },
          shapeOptions: {
            color: '#bada55',
          },
        },

        rectangle: {
          shapeOptions: {
            clickable: false,
          },
        },
        circle: false, // Turns off this drawing tool
        circleMarker: false,
        marker: false,
      },
      edit: {
        featureGroup: editableLayers, //REQUIRED!!
        remove: false,
      },
    }

    const drawControl = new L.Control.Draw(drawPluginOptions)
    map.addControl(drawControl)
    map.on('draw:created', e => {
      console.log(e.layerType)
      const type = e.layerType
      const layer = e.layer
      // var type = e.layerType,
      //   layer = e.layer

      if (type === 'polygon') {
        layer.bindPopup('A popup!')
      }

      editableLayers.addLayer(layer)
    })
    // const drawnItems = L.featureGroup()
    // map.addLayer(drawnItems)

    // const drawControl = L.Control.Draw({
    //   edit: {
    //     featureGroup: drawnItems,
    //   },
    // })
    // map.addControl(drawControl)
    // map.addControl(
    //   new L.Control.Draw({
    //     edit: {
    //       featureGroup: drawnItems,
    //       poly: {
    //         allowIntersection: false,
    //       },
    //     },
    //     draw: {
    //       polygon: {
    //         allowIntersection: false,
    //         showArea: true,
    //       },
    //     },
    //   })
    // )

    // const map = L.map('map', {
    //   center: [59.32496507200476, 18.070742255316343],
    //   zoom: 18,
    //   layers: [
    //     L.tileLayer(mapProviders.GOOGLE.url, {
    //       attribution: mapProviders.GOOGLE.attribution,
    //     }),
    //   ],
    // })

    return () => {
      map.remove()
    }
  }, [])
  return <div style={{ height: '400px' }} id='map'></div>
}
