export const configFormModel = {
  formId: 'configForm',
  formField: {
    projectName: {
      name: 'projectName',
      label: 'Project Name',
      requiredErrorMsg: 'Project name is required',
    },
    projectLocation: {
      name: 'projectLocation',
      label: 'Project Location',
      requiredErrorMsg: 'Project location is required for the energy calculation',
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
    systemInclination: {
      name: 'systemInclination',
      label: 'Inclination slider',
      requiredErrorMsg: '',
    },
    yearlyLoad: {
      name: 'yearlyLoad',
      label: 'Yearly electricity consumption kWh',
      requiredErrorMsg: 'Yearly electricity consumption is required to estimate exported electricity',
    },
    loadProfile: {
      name: 'loadProfile',
      label: 'Your electricity consumption profile',
      requiredErrorMsg: 'Electricity consumption profile is required to estimate flow of electricity',
    },
  },
}
