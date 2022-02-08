import { useState } from 'react'
import { Heading, Button, Stack, Divider, Switch, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch, batch, useSelector } from 'react-redux'

import { InputField, SliderInputField, SelectField, FormHeading } from './FormFields'
import { AdjustbleArrow, AdjustbleRoofAngle } from '../../assets/CustomIcons'
import { MapboxMapEdit, MapboxMapStatic } from '../Location'
import { project, calculateEnergy, getHourlyData, updateProject } from '../../reducers/projectReducer'
import { configFormModel } from './FormModel/configFormModel'

export const EditProjectForm = ({ id }) => {
  const [isEditLocationMode, setIsEditLocationMode] = useState(false)
  const { projectName, systemSize, systemAzimuth, systemInclination, yearlyLoad, loadProfile, location } = useSelector(
    (store) => store.project
  )

  const dispatch = useDispatch()
  const toast = useToast()

  const formInitialValues = {
    projectName,
    location,
    systemSize,
    systemAzimuth,
    systemInclination,
    yearlyLoad,
    loadProfile,
  }

  const validationSchema = Yup.object({
    projectName: Yup.string().required('Required'),
    location: Yup.number(),
    systemSize: Yup.number(),
    systemAzimuth: Yup.number(),
    systemInclination: Yup.number(),
    yearlyLoad: Yup.number(),
    loadProfile: Yup.string(),
  })

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
      dispatch(calculateEnergy({ ...values, _id: 'update', id }))
      dispatch(getHourlyData(values.loadProfile, 'loadProfile'))
      dispatch(getHourlyData('SE3', 'spotPrice'))
    })
    actions.resetForm({ values })
    //TODO: set toast according to response from backend
    toast({
      title: `Success project updated!`,
      status: 'success',
      isClosable: true,
    })
  }

  return (
    <Stack w='100%' flexDir='column' p={4} spacing={'20px'} dir='column'>
      <Heading as='h2' size='2xl'>
        Project: {projectName}
      </Heading>
      <Divider />
      <Formik initialValues={formInitialValues} validationSchema={validationSchema} onSubmit={submitForm}>
        {(props) => (
          <Form id={'editForm'}>
            <Stack spacing={2} mt='20px'>
              <Stack spacing={2} direction='column'>
                <FormHeading text={isEditLocationMode ? 'Edit Location' : 'Edit Orientation'} />
                <FormControl display='flex' alignItems='center'>
                  <FormLabel htmlFor='editLocation' mb='0'>
                    Edit Location
                  </FormLabel>
                  <Switch id='editLocation' onChange={() => setIsEditLocationMode(!isEditLocationMode)} />
                </FormControl>
                <InputField
                  name={configFormModel.formField.location.name}
                  label={configFormModel.formField.location.label}
                  value={props.values.location}
                />
                {isEditLocationMode && <MapboxMapEdit height={[300, 400]} position='relative' />}

                {!isEditLocationMode && (
                  <MapboxMapStatic height={[300, 400]} position='relative'>
                    <AdjustbleArrow
                      angle={props.values.systemAzimuth}
                      boxSize={200}
                      color={'white'}
                      strokeW={3}
                      position='absolute'
                    />
                  </MapboxMapStatic>
                )}
                <SliderInputField
                  name={configFormModel.formField.systemAzimuth.name}
                  aria-label={configFormModel.formField.systemAzimuth.label}
                  defaultValue={0}
                  min={-180}
                  max={180}
                  step={1}
                  markers={[
                    { v: -180, ml: -3 },
                    { v: -90, ml: -3 },
                    { v: 0, ml: -1 },
                    { v: 90, ml: -2 },
                    { v: 180, ml: -4 },
                  ]}
                />

                <FormHeading text={'Roof inclination'} />
                <AdjustbleRoofAngle angle={props.values.systemInclination} width={'100%'} height={200} />
                <SliderInputField
                  name={configFormModel.formField.systemInclination.name}
                  aria-label={configFormModel.formField.systemInclination.label}
                  defaultValue={30}
                  min={0}
                  max={90}
                  step={5}
                  markers={[
                    { v: 0, ml: -1 },
                    { v: 5, ml: -1 },
                    { v: 10, ml: -2 },
                    { v: 15, ml: -2 },
                    { v: 20, ml: -2 },
                    { v: 25, ml: -2 },
                    { v: 30, ml: -2 },
                    { v: 35, ml: -2 },
                    { v: 40, ml: -2 },
                    { v: 45, ml: -2 },
                    { v: 50, ml: -2 },
                    { v: 60, ml: -2 },
                    { v: 70, ml: -2 },
                    { v: 90, ml: -2 },
                  ]}
                />
                <FormHeading text={'System size'} />
                <InputField
                  name={configFormModel.formField.systemSize.name}
                  label={configFormModel.formField.systemSize.label}
                  type='number'
                />
                <FormHeading text={'Consumption data'} />
                <InputField
                  name={configFormModel.formField.yearlyLoad.name}
                  label={configFormModel.formField.yearlyLoad.label}
                  type='number'
                />
                <SelectField
                  name={configFormModel.formField.loadProfile.name}
                  label={configFormModel.formField.loadProfile.label}
                  options={[
                    { value: 'domestic', label: 'Domestic' },
                    { value: 'townhouse', label: 'Townhouse' },
                  ]}
                />
              </Stack>
              <Stack direction='row'>
                <Button disabled={!props.dirty} type='submit'>
                  {'Save & Calculate'}
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  )
}
