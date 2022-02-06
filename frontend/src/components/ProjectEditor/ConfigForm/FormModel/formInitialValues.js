import { configFormModel } from './configFormModel'
const {
  formField: { projectName, projectSize, systemAzimuth },
} = configFormModel

export const formInitialValues = {
  [projectName.name]: '',
  [projectSize.name]: '',
  [systemAzimuth.name]: '',
}
