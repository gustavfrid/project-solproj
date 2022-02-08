import { configFormModel } from './configFormModel'

const {
  formField: { projectName, location, systemSize, systemAzimuth, systemInclination, yearlyLoad, loadProfile },
} = configFormModel

export const formInitialValues = {
  [projectName.name]: '',
  [location.name]: [18.070742255316343, 59.32496507200476],
  [systemSize.name]: '',
  [systemAzimuth.name]: 0,
  [systemInclination.name]: 30,
  [yearlyLoad.name]: '',
  [loadProfile.name]: 'townhouse',
}
