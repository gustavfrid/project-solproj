import { Stack } from '@chakra-ui/react'
import { ProjectInfoForm, ProjectSizingForm } from '.'

export const ProjectFormSummary = ({ formField }) => {
  return (
    <Stack spacing={4}>
      <ProjectInfoForm formField={formField} />
      <ProjectSizingForm formField={formField} />
    </Stack>
  )
}
