import * as Yup from 'yup'

import { configFormModel } from './configFormModel'

const {
  formField: { projectName, projectLocation, systemSize, systemAzimuth, systemInclination, yearlyLoad, loadProfile },
} = configFormModel

export const validationSchema = [
  Yup.object().shape({
    [projectName.name]: Yup.string().required(`${projectName.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [projectLocation.name]: Yup.string(),
  }),
  Yup.object().shape({
    [systemSize.name]: Yup.number().required(`${systemSize.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [systemAzimuth.name]: Yup.number(),
  }),
  Yup.object().shape({
    [systemInclination.name]: Yup.number(),
  }),
  Yup.object().shape({
    [yearlyLoad.name]: Yup.number(),
  }),
  Yup.object().shape({
    [loadProfile.name]: Yup.string(),
  }),
]
