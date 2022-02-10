import { Flex, Heading, Button, Stack, Divider, useToast } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { Formik, Form } from 'formik'
import { useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { project, calculateEnergy, getHourlyData } from '../../reducers/projectReducer'
import { ProjectInfoForm, ProjectConfigForm, ProjectFormSummary, ProjectSizingForm } from './Forms'
import { validationSchema } from './FormModel/validationSchema'
import { configFormModel } from './FormModel/configFormModel'
import { formInitialValues } from './FormModel/formInitialValues'

const steps = ['Info', 'Sizing', 'Configure', 'Review']
const { formId, formField } = configFormModel

const renderStepContent = (step) => {
  switch (step) {
    case 0:
      return <ProjectInfoForm formField={formField} />
    case 1:
      return <ProjectSizingForm formField={formField} />
    case 2:
      return <ProjectConfigForm formField={formField} />
    case 3:
      return <ProjectFormSummary />
    default:
      return <div>Not Found</div>
  }
}

export const NewProjectForm = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })
  const dispatch = useDispatch()
  const toast = useToast()
  const navigate = useNavigate()

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
      dispatch(calculateEnergy({ ...values, action: 'new' }))
      dispatch(getHourlyData(values.loadProfile, 'loadProfile'))
      dispatch(getHourlyData('SE3', 'spotPrice'))
    })
    nextStep()

    //TODO: set toast according to response from backend
    toast({
      title: `Success project created!`,
      status: 'success',
      isClosable: true,
    })
    navigate('/main/projects/loading') // navigating to a loading site, could be handled by loader in ui?
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
    <Stack w='100%' flexDir='column' p={4} spacing={'20px'} dir='column'>
      <Heading as='h2' size='2xl'>
        Create New Project
      </Heading>
      <Divider />
      <Formik initialValues={formInitialValues} validationSchema={currentValidationSchema} onSubmit={handleSubmit}>
        {(props) => (
          <Steps activeStep={activeStep}>
            {steps.map((label) => (
              <Step label={label} key={label}>
                {activeStep === steps.length ? (
                  //   success component
                  <Flex px={4} py={4} w='100%' flexDir='column'>
                    <Heading as='h3' size='xl' textAlign='center'>
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
                          <Button variant='ghost' colorScheme={'yellow'} onClick={prevStep}>
                            Back
                          </Button>
                        )}
                        <Button colorScheme={'yellow'} disabled={props.isSubmitting} type='submit'>
                          {isLastStep ? 'Finish & Create' : 'Next'}
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
