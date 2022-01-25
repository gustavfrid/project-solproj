import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'
import { project } from '../../reducers/project'

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const ProjectName = () => {
  const projectName = useSelector((store) => store.project.projectName)
  const dispatch = useDispatch()

  return (
    <InputWrapper>
      <input
        id='projectName'
        name='projectName'
        type='text'
        placeholder='Project Name'
        value={projectName}
        onChange={(e) => {
          dispatch(project.actions.setProjectName(e.target.value))
        }}
      />
    </InputWrapper>
  )
}
