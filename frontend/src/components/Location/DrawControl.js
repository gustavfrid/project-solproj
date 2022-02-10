import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { useControl } from 'react-map-gl'

export const DrawControl = (props) => {
  console.log('🚀 ~ file: DrawControl.js ~ line 5 ~ DrawControl ~ props', props)

  useControl(
    ({ map }) => {
      map.on('draw.create', props.onCreate)
      map.on('draw.update', props.onUpdate)
      map.on('draw.delete', props.onDelete)
      // const draw = new MapboxDraw(props)

      // if (props.mapFeatures) {
      //   console.log(
      //     '🚀 ~ file: DrawControl.js ~ line 14 ~ DrawControl ~ props.mapFeatures',
      //     JSON.stringify({ features: props.mapFeatures })
      //   )
      //   const feature = { type: 'Point', coordinates: [18.070742255316343, 59.32496507200476] }
      //   // draw.add(JSON.stringify(props.mapFeatures[0]))
      //   const featureIds = draw.add(feature)
      //   console.log('🚀 ~ file: DrawControl.js ~ line 20 ~ DrawControl ~ featureIds', featureIds)
      // }
      return new MapboxDraw(props)
    },
    ({ map }) => {
      map.off('draw.create', props.onCreate)
      map.off('draw.update', props.onUpdate)
      map.off('draw.delete', props.onDelete)
    },
    {
      position: props.position,
    }
  )

  return null
}

DrawControl.defaultProps = {
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
}
