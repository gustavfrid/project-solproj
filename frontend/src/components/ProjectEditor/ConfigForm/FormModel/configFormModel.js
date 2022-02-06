export const configFormModel = {
  formId: 'configForm',
  formField: {
    projectName: {
      name: 'projectName',
      label: 'Project Name',
      requiredErrorMsg: 'Project name is required',
    },
    projectSize: {
      name: 'projectSize',
      label: 'Project Size kW',
      requiredErrorMsg: 'Project size is required to estimate production',
    },
    systemAzimuth: {
      name: 'systemAzimuth',
      label: 'Azimuth slider',
      requiredErrorMsg: '',
    },
  },
}
