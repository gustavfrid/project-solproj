import * as Yup from 'yup'

import { configFormModel } from './configFormModel'

const {
  formField: { projectName, projectLocation, projectSize, systemAzimuth, systemInclination, yearlyLoad },
} = configFormModel

export const validationSchema = [
  Yup.object().shape({
    [projectName.name]: Yup.string().required(`${projectName.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [projectLocation.name]: Yup.string(),
  }),
  Yup.object().shape({
    [projectSize.name]: Yup.number().required(`${projectSize.requiredErrorMsg}`),
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
]
