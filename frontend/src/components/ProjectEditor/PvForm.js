import { useDispatch, batch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Stack, Button, Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'

import { project, calculateEnergy, getHourlyData } from '../../reducers/projectReducer'

export const PvForm = () => {
  const { projectName, systemSize, systemAzimuth, systemInclination, yearlyLoad } = useSelector(
    (store) => store.project
  )

  const dispatch = useDispatch()

  const handleSubmit = (values) => {
    batch(() => {
      dispatch(project.actions.setProjectName(values.projectName))
      dispatch(project.actions.setSystemSize(values.systemSize))
      dispatch(project.actions.setSystemAzimuth(values.systemAzimuth))
      dispatch(project.actions.setSystemInclination(values.systemInclination))
      dispatch(project.actions.setYearlyLoad(values.yearlyLoad))
    })
    dispatch(calculateEnergy())
    dispatch(getHourlyData('domestic', 'loadProfile'))
  }

  return (
    <Stack spacing={2} direction='column'>
      <h3>System configuration</h3>
      <Formik
        enableReinitialize={true}
        initialValues={{
          projectName,
          systemSize,
          systemAzimuth,
          systemInclination,
          yearlyLoad,
        }}
        validationSchema={Yup.object({
          projectName: Yup.string().required('Required'),
          systemSize: Yup.number(),
          systemAzimuth: Yup.number(),
          systemInclination: Yup.number(),
          yearlyLoad: Yup.number(),
        })}
        onSubmit={(values, actions) => {
          handleSubmit(values)
        }}>
        {(props) => (
          <Form>
            <Stack spacing='24px'>
              <Field name='projectName'>
                {({ field, form }) => (
                  <FormControl variant='floating' isInvalid={form.errors.projectName && form.touched.projectName}>
                    <Input {...field} id='projectName' placeholder=' ' />
                    <FormLabel htmlFor='projectName'>Project Name</FormLabel>
                    <FormErrorMessage>{form.errors.projectName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='systemSize'>
                {({ field, form }) => (
                  <FormControl variant='floating' isInvalid={form.errors.systemSize && form.touched.systemSize}>
                    <Input {...field} id='systemSize' placeholder=' ' />
                    <FormLabel htmlFor='systemSize'>System Size kW</FormLabel>
                    <FormErrorMessage>{form.errors.systemSize}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='systemAzimuth'>
                {({ field, form }) => (
                  <FormControl variant='floating' isInvalid={form.errors.systemAzimuth && form.touched.systemAzimuth}>
                    <Input {...field} id='systemAzimuth' placeholder=' ' />
                    <FormLabel htmlFor='systemAzimuth'>System Azimuth -180 - 180degrees</FormLabel>
                    <FormErrorMessage>{form.errors.systemAzimuth}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='systemInclination'>
                {({ field, form }) => (
                  <FormControl
                    variant='floating'
                    isInvalid={form.errors.systemInclination && form.touched.systemInclination}>
                    <Input {...field} id='systemInclination' placeholder=' ' />
                    <FormLabel htmlFor='systemInclination'>System Inclination 0 -90 degrees</FormLabel>
                    <FormErrorMessage>{form.errors.systemInclination}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='yearlyLoad'>
                {({ field, form }) => (
                  <FormControl variant='floating' isInvalid={form.errors.yearlyLoad && form.touched.yearlyLoad}>
                    <Input {...field} id='yearlyLoad' placeholder=' ' />
                    <FormLabel htmlFor='yearlyLoad'>Yearly electricity consumption kWh</FormLabel>
                    <FormErrorMessage>{form.errors.yearlyLoad}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button mt={4} colorScheme='yellow' isLoading={props.isSubmitting} type='submit'>
                Calculate
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  )
}
