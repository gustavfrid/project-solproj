import { useState } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const PvForm = () => {
  const [systemSize, setSystemSize] = useState('')
  const [systemAzimuth, setSystemAzimuth] = useState('')
  const [systemInclination, setSystemInclination] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const form = new FormData(e.target)
    const formData = Object.fromEntries(form.entries())
    console.log('form submitted', formData)
  }

  return (
    <Form onSubmit={handleSubmit}>
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
