import { configFormModel } from './configFormModel'

const {
  formField: { projectName, projectLocation, systemSize, systemAzimuth, systemInclination, yearlyLoad, loadProfile },
} = configFormModel

export const formInitialValues = {
  [projectName.name]: '',
  [projectLocation.name]: '18.070742255316343, 59.32496507200476',
  [systemSize.name]: '',
  [systemAzimuth.name]: '',
  [systemInclination.name]: 30,
  [yearlyLoad.name]: '',
  [loadProfile.name]: 'townhouse',
}
