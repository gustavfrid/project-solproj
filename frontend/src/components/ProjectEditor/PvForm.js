import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { project, calculateEnergy, getHourlyData } from '../../reducers/projectReducer'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const PvForm = () => {
  const { systemSize, systemAzimuth, systemInclination, yearlyLoad } = useSelector((store) => store.project)

  const dispatch = useDispatch()

  const onSubmitForm = (e) => {
    e.preventDefault()
    dispatch(calculateEnergy())
    dispatch(getHourlyData('domestic', 'loadProfile'))
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
        onChange={(e) => {
          dispatch(project.actions.setSystemSize(e.target.value))
        }}
      />
      <label htmlFor='systemAzimuth'>Direction</label>
      <input
        id='systemAzimuth'
        name='systemAzimuth'
        type='number'
        placeholder='The direction of the system'
        value={systemAzimuth}
        onChange={(e) => {
          dispatch(project.actions.setSystemAzimuth(e.target.value))
        }}
      />
      <label htmlFor='systemInclination'>Inclination</label>
      <input
        id='systemInclination'
        name='systemInclination'
        type='number'
        placeholder='The inclination of the system'
        value={systemInclination}
        onChange={(e) => {
          dispatch(project.actions.setSystemInclination(e.target.value))
        }}
      />
      <label htmlFor='yearlyLoad'>Yearly electricity consumption</label>
      <input
        id='yearlyLoad'
        name='yearlyLoad'
        type='number'
        placeholder='Your yearly kWh'
        value={yearlyLoad}
        onChange={(e) => {
          dispatch(project.actions.setYearlyLoad(e.target.value))
        }}
      />
      <button type='submit'>Calculate</button>
    </Form>
  )
}
