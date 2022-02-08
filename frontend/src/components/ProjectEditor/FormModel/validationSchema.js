import * as Yup from 'yup'

import { configFormModel } from './configFormModel'

const {
  formField: { projectName, location, systemSize, systemAzimuth, systemInclination, yearlyLoad, loadProfile },
} = configFormModel

export const validationSchema = [
  Yup.object().shape({
    [projectName.name]: Yup.string().required(`${projectName.requiredErrorMsg}`),
    [location.name]: Yup.array(),
  }),
  Yup.object().shape({
    [systemSize.name]: Yup.number().required(`${systemSize.requiredErrorMsg}`),
    [systemAzimuth.name]: Yup.number(),
    [systemInclination.name]: Yup.number(),
    [yearlyLoad.name]: Yup.number(),
    [loadProfile.name]: Yup.string(),
  }),
]

export const validationSchemaEdit = [
  Yup.object().shape({
    [projectName.name]: Yup.string().required(`${projectName.requiredErrorMsg}`),
    [location.name]: Yup.string(),
    [systemSize.name]: Yup.number().required(`${systemSize.requiredErrorMsg}`),
    [systemAzimuth.name]: Yup.number(),
    [systemInclination.name]: Yup.number(),
    [yearlyLoad.name]: Yup.number(),
    [loadProfile.name]: Yup.string(),
  }),
]
