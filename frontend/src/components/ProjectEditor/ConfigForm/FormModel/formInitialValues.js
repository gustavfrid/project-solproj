import { configFormModel } from './configFormModel'
const {
  formField: { projectName, projectSize },
} = configFormModel

export const formInitialValues = {
  [projectName.name]: '',
  [projectSize.name]: '',
}
