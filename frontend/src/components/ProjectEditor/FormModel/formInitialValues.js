import { configFormModel } from './configFormModel'
const {
  formField: { projectName, projectSize, systemAzimuth, systemInclination, yearlyLoad },
} = configFormModel

export const formInitialValues = {
  [projectName.name]: '',
  [projectSize.name]: '',
  [systemAzimuth.name]: '',
  [systemInclination.name]: '',
  [yearlyLoad.name]: '',
}
