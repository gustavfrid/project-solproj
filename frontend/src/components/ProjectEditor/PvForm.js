import { useDispatch, batch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Stack, Button, Input, FormControl, FormLabel, FormErrorMessage, HStack, Center, Flex } from '@chakra-ui/react'

import { CustomSlider } from './CustomSlider'
import { AdjustbleAngle, AdjustbleArrow } from '../../assets/CustomIcons'
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
    dispatch(getHourlyData('townhouse', 'loadProfile'))
    dispatch(getHourlyData('SE3', 'spotPrice'))
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
          systemAzimuthSlider: 0,
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
          // alert(JSON.stringify(values, null, 2))
          handleSubmit(values)
        }}>
        {(props) => (
          <Form>
            <Stack spacing='20px'>
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
              <Flex flexDir='column'>
                <Center>
                  <AdjustbleArrow angle={props.values.systemAzimuth} boxSize={20} />
                </Center>
                <CustomSlider
                  name='systemAzimuth'
                  aria-label='Azimuth slider'
                  defaultValue={0}
                  min={-180}
                  max={180}
                  markers={[
                    { v: -180, ml: -3 },
                    { v: -90, ml: -3 },
                    { v: 0, ml: -1 },
                    { v: 90, ml: -2 },
                    { v: 180, ml: -4 },
                  ]}
                />
              </Flex>
              <HStack justify='center'>
                <AdjustbleAngle angle={props.values.systemInclination} boxSize={20} />
                <AdjustbleAngle angle={props.values.systemInclination} boxSize={20} />
                <AdjustbleAngle angle={props.values.systemInclination} boxSize={20} />
              </HStack>
              <CustomSlider
                name='systemInclination'
                aria-label='Inclination slider'
                defaultValue={0}
                min={0}
                max={90}
                markers={[
                  { v: 0, ml: -1 },
                  { v: 15, ml: -2 },
                  { v: 30, ml: -2 },
                  { v: 40, ml: -2 },
                  { v: 90, ml: -2 },
                ]}
                step={5}
              />
              {/* <Field name='systemInclination'>
                {({ field, form }) => (
                  <FormControl
                    variant='floating'
                    isInvalid={form.errors.systemInclination && form.touched.systemInclination}>
                    <Input {...field} id='systemInclination' placeholder=' ' />
                    <FormLabel htmlFor='systemInclination'>System Inclination 0 -90 degrees</FormLabel>
                    <FormErrorMessage>{form.errors.systemInclination}</FormErrorMessage>
                  </FormControl>
                )}
              </Field> */}
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
