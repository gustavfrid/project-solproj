import * as Yup from 'yup'

import { configFormModel } from './configFormModel'

const {
  formField: { projectName, projectSize },
} = configFormModel

export const validationSchema = [
  Yup.object().shape({
    [projectName.name]: Yup.string().required(`${projectName.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [projectSize.name]: Yup.number().required(`${projectSize.requiredErrorMsg}`),
  }),
]
