import { Flex, Heading, Button, Stack } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { Formik, Form } from 'formik'

import { ProjectInfoForm } from './Forms/ProjectInfoForm'
import { ProjectSizingForm } from './Forms/ProjectSizingForm'
import { ProjectFormSummary } from './Forms/ProjectFormSummary'

import { validationSchema } from './FormModel/validationSchema'
import { configFormModel } from './FormModel/configFormModel'
import { formInitialValues } from './FormModel/formInitialValues'

const { formId, formField } = configFormModel
const steps = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]

const renderStepContent = (step, props) => {
  switch (step) {
    case 0:
      return <ProjectInfoForm formField={formField} />
    case 1:
      return <ProjectSizingForm formField={formField} />
    case 2:
      return <ProjectFormSummary formField={formField} />
    default:
      return <div>Not Found</div>
  }
}

export const ConfigForm = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })
  const currentValidationSchema = validationSchema[activeStep]
  const isLastStep = activeStep === steps.length - 1

  // delay function to simulate async
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const submitForm = async (values, actions) => {
    await sleep(1000)
    alert(JSON.stringify(values, null, 2))
    actions.setSubmitting(false)

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
    <Flex flexDir='column' w='100%'>
      <Steps activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <div>Content should go here?</div>
          </Step>
        ))}
      </Steps>
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
        <>
          {/* // Form component */}

          <Formik initialValues={formInitialValues} validationSchema={currentValidationSchema} onSubmit={handleSubmit}>
            {(props) => (
              <Form id={formId}>
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
              </Form>
            )}
          </Formik>

          {/* form component end */}
        </>
      )}
    </Flex>
  )
}
