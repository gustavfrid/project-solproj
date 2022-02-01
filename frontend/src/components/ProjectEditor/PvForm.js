import { useDispatch, batch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Stack } from '@mui/material'

import { project, calculateEnergy, getHourlyData } from '../../reducers/projectReducer'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const PvForm = () => {
  const { projectName, systemSize, systemAzimuth, systemInclination, yearlyLoad } = useSelector(
    (store) => store.project
  )

  const dispatch = useDispatch()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName,
      systemSize,
      systemAzimuth,
      systemInclination,
      yearlyLoad,
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required('Required'),
      systemSize: Yup.number(),
      systemAzimuth: Yup.number(),
      systemInclination: Yup.number(),
      yearlyLoad: Yup.number(),
    }),
    onSubmit: (values) => {
      handleSubmit(values)
    },
  })

  const handleSubmit = (values) => {
    console.log(values)
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
      <Form onSubmit={formik.handleSubmit}>
        <TextField
          id='projectName'
          name='projectName'
          type='text'
          label='Project Name'
          error={formik.touched.projectName && formik.errors.projectName ? true : false}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.projectName}
          helperText={formik.touched.projectName && formik.errors.projectName ? formik.errors.projectName : ''}
        />
        <TextField
          id='systemSize'
          name='systemSize'
          type='number'
          label='System Size kW'
          error={formik.touched.systemSize && formik.errors.systemSize ? true : false}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.systemSize}
          helperText={formik.touched.systemSize && formik.errors.systemSize ? formik.errors.systemSize : ''}
        />
        <TextField
          id='systemAzimuth'
          name='systemAzimuth'
          type='number'
          label='System Azimuth degrees'
          error={formik.touched.systemAzimuth && formik.errors.systemAzimuth ? true : false}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.systemAzimuth}
          helperText={formik.touched.systemAzimuth && formik.errors.systemAzimuth ? formik.errors.systemAzimuth : ''}
        />
        <TextField
          id='systemInclination'
          name='systemInclination'
          type='number'
          label='System Inclination degrees'
          error={formik.touched.systemInclination && formik.errors.systemInclination ? true : false}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.systemInclination}
          helperText={
            formik.touched.systemInclination && formik.errors.systemInclination ? formik.errors.systemInclination : ''
          }
        />
        <TextField
          id='yearlyLoad'
          name='yearlyLoad'
          type='number'
          label='Yearly electricity consumption kWh/year'
          error={formik.touched.yearlyLoad && formik.errors.yearlyLoad ? true : false}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.yearlyLoad}
          helperText={formik.touched.yearlyLoad && formik.errors.yearlyLoad ? formik.errors.yearlyLoad : ''}
        />
        <Button type='submit' variant='contained'>
          Calculate
        </Button>
      </Form>
    </Stack>
  )
}
