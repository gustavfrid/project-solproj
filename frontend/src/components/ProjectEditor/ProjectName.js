import { useState } from 'react'
import { useDispatch } from 'react-redux'

import styled from 'styled-components'
import { project } from '../../reducers/project'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const ProjectName = () => {
  const [projectName, setProjectName] = useState('')
  const dispatch = useDispatch()

  const onSubmitForm = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const formData = Object.fromEntries(form.entries())
    dispatch(project.actions.setProjectName(formData.projectName))
    console.log('form submitted', formData)
  }

  return (
    <Form onSubmit={onSubmitForm}>
      <input
        id='projectName'
        name='projectName'
        type='text'
        placeholder='Project Name'
        value={projectName}
        onChange={(e) => {
          setProjectName(e.target.value)
        }}
      />
    </Form>
  )
}
