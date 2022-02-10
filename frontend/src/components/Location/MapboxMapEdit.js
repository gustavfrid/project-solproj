import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@chakra-ui/react'
import Map, { GeolocateControl, FullscreenControl, Marker } from 'react-map-gl'
import { project } from '../../reducers/projectReducer'
import { GeocoderControl } from './GeocoderControl'
import { DrawControl } from './DrawControl'
import area from '@turf/area'

import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

export const MapboxMapEdit = ({
  setFormikLocationValue,
  setFormikSizeValue,
  height,
  position,
  children,
  hasGeocoder,
  hasDrawControl,
  hasGeolocate,
  zoomControls,
}) => {
  const mapStyle = useSelector((store) => store.project.mapStyle)
  const viewState = useSelector((store) => store.project.viewState)
  const location = useSelector((store) => store.project.location)
  const mapFeatures = useSelector((store) => store.project.mapFeatures)
  const dispatch = useDispatch()
  console.log('🚀 ~ file: MapboxMapEdit.js ~ line 30 ~ MapboxMapEdit')
  const [, setFeatures] = useState({})

  // useEffect(() => {
  //   if (!hasDrawControl && DrawControl) return
  //   DrawControl.add(JSON.stringify(mapFeatures))
  // }, [])

  const onUpdate = useCallback(
    (e) => {
      console.log('🚀 ~ file: MapboxMapEdit.js onUpdate ~ line 40 ~ e', e)
      setFeatures((currFeatures) => {
        const newFeatures = { ...currFeatures }
        for (const f of e.features) {
          newFeatures[f.id] = f
        }

        let polygonArea = 0
        const featuresArray = Object.values(newFeatures)

        for (const polygon of featuresArray) {
          polygonArea += area(polygon)
        }

        setFormikSizeValue(Math.round(polygonArea * 0.2))
        dispatch(project.actions.setMapFeatures(featuresArray))
        return newFeatures
      })
    },
    [dispatch, setFormikSizeValue]
  )

  const onDelete = useCallback(
    (e) => {
      console.log('🚀 ~ file: MapboxMapEdit.js onDelete ~ line 63 ~ e', e)
      setFeatures((currFeatures) => {
        const newFeatures = { ...currFeatures }
        for (const f of e.features) {
          delete newFeatures[f.id]
        }

        let polygonArea = 0
        const featuresArray = Object.values(newFeatures)

        for (const polygon of featuresArray) {
          polygonArea += area(polygon)
        }

        setFormikSizeValue(Math.round(polygonArea * 0.2))
        dispatch(project.actions.setMapFeatures(featuresArray))
        return newFeatures
      })
    },
    [dispatch, setFormikSizeValue]
  )

  // let polygonArea = 0;
  // for (const polygon of props.polygons) {
  //   polygonArea += area(polygon);
  // }

  const onMove = useCallback(
    (evt) => {
      dispatch(project.actions.setViewState(evt.viewState))
    },
    [dispatch]
  )

  const handleMarkerLocation = (e) => {
    const newLocation = e.target._lngLat
    const newViewState = { ...viewState, longitude: newLocation.lng, latitude: newLocation.lat }

    dispatch(project.actions.setLocation([newLocation.lng, newLocation.lat]))
    dispatch(project.actions.setViewState(newViewState))
    if (setFormikLocationValue) setFormikLocationValue([newLocation.lng, newLocation.lat])
  }

  const handledGeolocate = (e) => {
    const newLocation = e.coords
    const newViewState = { ...viewState, longitude: newLocation.longitude, latitude: newLocation.latitude }

    dispatch(project.actions.setLocation([newLocation.longitude, newLocation.latitude]))
    dispatch(project.actions.setViewState(newViewState))
    if (setFormikLocationValue) setFormikLocationValue([newLocation.longitude, newLocation.latitude])
  }

  return (
    <Box w='100%' h={height} position={position} display='flex' justifyContent='center' alignItems='center'>
      <Map
        {...viewState}
        {...zoomControls}
        onMove={onMove}
        style={{ height: '100%' }}
        mapStyle={mapStyle}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
        {hasGeolocate && <GeolocateControl position='bottom-right' onGeolocate={handledGeolocate} />}
        <FullscreenControl />
        {hasGeocoder && (
          <GeocoderControl
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            position='bottom-left'
            setFormikLocationValue={setFormikLocationValue}
          />
        )}
        {hasDrawControl && (
          <DrawControl
            position='top-left'
            displayControlsDefault={false}
            controls={{
              polygon: true,
              trash: true,
            }}
            defaultMode='draw_polygon'
            onCreate={onUpdate}
            onUpdate={onUpdate}
            onDelete={onDelete}
            mapFeatures={mapFeatures}
          />
        )}
        <Marker
          longitude={location[0]}
          latitude={location[1]}
          anchor='bottom'
          draggable
          onDragEnd={handleMarkerLocation}
        />
      </Map>
      {children}
    </Box>
  )
}
