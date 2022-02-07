import { configFormModel } from './configFormModel'
const {
  formField: { projectName, projectLocation, projectSize, systemAzimuth, systemInclination, yearlyLoad },
} = configFormModel

export const formInitialValues = {
  [projectName.name]: '',
  [projectLocation.name]: '',
  [projectSize.name]: '',
  [systemAzimuth.name]: '',
  [systemInclination.name]: 30,
  [yearlyLoad.name]: '',
}
