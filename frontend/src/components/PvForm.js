import { useState } from 'react'
import { useDispatch, batch } from 'react-redux'
import styled from 'styled-components'

import { project, calculateEnergy } from '../reducers/project'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const PvForm = () => {
  const [systemSize, setSystemSize] = useState('')
  const [systemAzimuth, setSystemAzimuth] = useState('')
  const [systemInclination, setSystemInclination] = useState('')
  const dispatch = useDispatch()

  const onSubmitForm = e => {
    e.preventDefault()
    const form = new FormData(e.target)
    const formData = Object.fromEntries(form.entries())
    batch(() => {
      dispatch(project.actions.setSystemSize(formData.systemSize))
      dispatch(project.actions.setSystemAzimuth(formData.systemAzimuth))
      dispatch(project.actions.setSystemInclination(formData.systemInclination))
    })
    dispatch(calculateEnergy('lat=45&lon=8&peakpower=1&loss=14&outputformat=json'))
    console.log('form submitted', formData)
  }

  return (
    <Form onSubmit={onSubmitForm}>
      <label htmlFor='systemSize'>System size</label>
      <input
        id='systemSize'
        name='systemSize'
        type='number'
        placeholder='System size kW'
        value={systemSize}
        onChange={e => {
          setSystemSize(e.target.value)
        }}
      />
      <label htmlFor='systemAzimuth'>Direction</label>
      <input
        id='systemAzimuth'
        name='systemAzimuth'
        type='number'
        placeholder='The direction of the system'
        value={systemAzimuth}
        onChange={e => {
          setSystemAzimuth(e.target.value)
        }}
      />
      <label htmlFor='systemInclination'>Inclination</label>
      <input
        id='systemInclination'
        name='systemInclination'
        type='number'
        placeholder='The inclination of the system'
        value={systemInclination}
        onChange={e => {
          setSystemInclination(e.target.value)
        }}
      />
      <button type='submit'>Calculate</button>
    </Form>
  )
}
