import { Flex, Heading, Button, Stack } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { Formik, Form } from 'formik'
import { useDispatch, batch } from 'react-redux'
import { project, calculateEnergy, getHourlyData } from '../../reducers/projectReducer'

import { ProjectInfoForm, ProjectSizingForm, ProjectFormSummary } from './Forms'

import { validationSchema } from './FormModel/validationSchema'
import { configFormModel } from './FormModel/configFormModel'
import { formInitialValues } from './FormModel/formInitialValues'

const steps = ['Info', 'Configure', 'Review']
const { formId, formField } = configFormModel

const renderStepContent = (step, props) => {
  switch (step) {
    case 0:
      return <ProjectInfoForm formField={formField} />
    case 1:
      return <ProjectSizingForm formField={formField} />
    case 2:
      return <ProjectFormSummary />
    default:
      return <div>Not Found</div>
  }
}

export const NewProjectForm = ({ handleSaveProject }) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })
  const dispatch = useDispatch()

  const currentValidationSchema = validationSchema[activeStep]
  const isLastStep = activeStep === steps.length - 1

  const submitForm = async (values, actions) => {
    // alert(JSON.stringify(values, null, 2))
    actions.setSubmitting(false)
    batch(() => {
      dispatch(project.actions.setProjectName(values.projectName))
      dispatch(project.actions.setSystemSize(values.systemSize))
      dispatch(project.actions.setSystemAzimuth(values.systemAzimuth))
      dispatch(project.actions.setSystemInclination(values.systemInclination))
      dispatch(project.actions.setYearlyLoad(values.yearlyLoad))
      dispatch(project.actions.setLoadProfile(values.loadProfile))
    })
    dispatch(calculateEnergy())
    dispatch(getHourlyData(values.loadProfile, 'loadProfile'))
    dispatch(getHourlyData('SE3', 'spotPrice'))
    handleSaveProject()
    nextStep()
  }

  function handleSubmit(values, actions) {
    if (isLastStep) {
      submitForm(values, actions)
    } else {
      nextStep()
      actions.setTouched({})
      actions.setSubmitting(false)
    }
  }

  return (
    <Stack w='100%' flexDir='column' margin={3} spacing={'20px'} dir='column'>
      <Formik initialValues={formInitialValues} validationSchema={currentValidationSchema} onSubmit={handleSubmit}>
        {(props) => (
          <Steps activeStep={activeStep}>
            {steps.map((label) => (
              <Step label={label} key={label}>
                {activeStep === steps.length ? (
                  //   success component
                  <Flex px={4} py={4} w='100%' flexDir='column'>
                    <Heading fontSize='xl' textAlign='center'>
                      Woohoo! All steps completed!
                    </Heading>
                    <Button mx='auto' mt={6} size='sm' onClick={reset}>
                      Reset
                    </Button>
                  </Flex>
                ) : (
                  <Form id={formId}>
                    <Stack spacing={2} mt='20px'>
                      <Stack spacing={2} direction='column'>
                        {renderStepContent(activeStep, props)}
                      </Stack>
                      <Stack direction='row'>
                        {activeStep !== 0 && (
                          <Button variant='ghost' onClick={prevStep}>
                            Back
                          </Button>
                        )}
                        <Button disabled={props.isSubmitting} type='submit'>
                          {isLastStep ? 'Finish' : 'Next'}
                        </Button>
                      </Stack>
                    </Stack>
                  </Form>
                )}
              </Step>
            ))}
          </Steps>
        )}
      </Formik>
    </Stack>
  )
}
