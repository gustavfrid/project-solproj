import { useSelector } from 'react-redux'
import { Stack, Text, Grid, GridItem } from '@chakra-ui/react'
import { hoursToDays, dateArray } from '../../utils/dataHandlers'
import { RePieChart, ReAreaChartT } from '../Charts'
import { colors } from '../../Theme/colors'
import { FormHeading } from './FormFields'
import { SavingsIcon, SolarIcon, TreeIcon } from '../../assets/SummaryIcons'

export const ProjectSummary = () => {
  const { pvgis, load, price } = useSelector((store) => store.project)

  const hourlyExport = load.hourly.map((load, i) => (load - pvgis.hourly[i] > 0 ? 0 : load - pvgis.hourly[i]))
  const hourlyImport = load.hourly.map((load, i) => (load - pvgis.hourly[i] <= 0 ? 0 : load - pvgis.hourly[i]))
  const hourlyUse = pvgis.hourly.map((v, i) => v + hourlyExport[i])
  const dailyUse = hoursToDays(hourlyUse)
  const dailyExport = hoursToDays(hourlyExport)

  const hourlyProductionValue = pvgis.hourly.map((v, i) => v * price[i])
  const hourlyLoadCost = load.hourly.map((v, i) => v * price[i])
  const hourlyExportValue = hourlyExport.map((v, i) => v * price[i])
  const hourlyImportCost = hourlyImport.map((v, i) => v * price[i])

  const totalSelfConsumption = Math.round(hourlyUse.reduce((a, b) => a + b, 0))
  const totalExport = Math.round(hourlyExport.reduce((a, b) => a + b, 0))
  const totalImport = Math.round(hourlyImport.reduce((a, b) => a + b, 0))
  const totalProductionValue = Math.round(hourlyProductionValue.reduce((a, b) => a + b, 0))
  const totalLoadCost = Math.round(hourlyLoadCost.reduce((a, b) => a + b, 0))
  const dates = dateArray()

  return (
    <Stack w='100%' pl={5} pr={5}>
      <FormHeading text='Summary' />
      <Grid templateColumns='repeat(4, 1fr)' gap={5}>
        <GridItem colSpan={[4, 2, 1]} p={5} boxShadow='2xl' rounded='lg'>
          <Text align='center'>Where does your electricity come from?</Text>
          <RePieChart
            data={[
              { name: 'Solar', value: totalSelfConsumption, fill: colors.yellow },
              { name: 'Grid', value: totalImport, fill: colors.gray },
            ]}
          />
        </GridItem>
        <GridItem colSpan={[4, 2, 1]} p={5} boxShadow='2xl' rounded='lg'>
          <Text align='center'>Where does your electricity go?</Text>
          <RePieChart
            data={[
              { name: 'Use', value: totalSelfConsumption, fill: colors.yellow },
              { name: 'Export', value: -totalExport, fill: colors.gray },
            ]}
          />
        </GridItem>

        <GridItem
          colSpan={[4, 4, 2]}
          p={5}
          boxShadow='2xl'
          rounded='lg'
          display='flex'
          flexDirection='row'
          alignItems='center'>
          <Grid templateColumns='repeat(3, 1fr)' gap={3}>
            <GridItem colSpan={[3, 1, 3, 1]} p={5} display='flex' flexDirection='row' alignItems='center' gap={2}>
              <SavingsIcon boxSize={10} />
              <Stack direction={'column'}>
                <Text fontSize={18} color={'gray.400'}>
                  Savings
                </Text>
                <Text fontSize={22}>{totalProductionValue} €</Text>
              </Stack>
            </GridItem>
            <GridItem colSpan={[3, 1, 3, 1]} p={5} display='flex' flexDirection='row' alignItems='center' gap={2}>
              <SolarIcon boxSize={10} />
              <Stack direction={'column'}>
                <Text fontSize={18} color={'gray.400'}>
                  Solar Production
                </Text>
                <Text fontSize={22}>{pvgis.yearly} kWh</Text>
              </Stack>
            </GridItem>
            <GridItem colSpan={[3, 1, 3, 1]} p={5} display='flex' flexDirection='row' alignItems='center' gap={2}>
              <TreeIcon boxSize={10} />
              <Stack direction={'column'}>
                <Text fontSize={18} color={'gray.400'}>
                  CO2 Reduction
                </Text>
                <Text fontSize={22}>
                  {pvgis.yearly * 0.5 > 1000
                    ? `${(pvgis.yearly * 0.0005).toPrecision(2)} ton`
                    : `${(pvgis.yearly * 0.5).toPrecision(1)} kg`}
                </Text>
              </Stack>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem colSpan={[4, 4, 4]} w='100%' h='300px' p={3} boxShadow='2xl' rounded='lg'>
          <Text align='center'>Super fancy chart</Text>
          {load.daily && (
            <ReAreaChartT
              axisX={dates}
              data={[
                {
                  name: 'prod',
                  data: pvgis.daily,
                  stopColor: colors.yellow,
                  stroke: colors.yellow,
                  fill: colors.yellow,
                  opacity: 1,
                  unit: 'kWh',
                },
                {
                  name: 'load',
                  data: load.daily,
                  stopColor: colors.gray,
                  stroke: colors.gray,
                  fill: colors.gray,
                  opacity: 1,
                  unit: 'kWh',
                },
                {
                  name: 'export',
                  data: dailyExport,
                  stopColor: colors.blaze_orange,
                  stroke: colors.blaze_orange,
                  fill: colors.blaze_orange,
                  opacity: 1,
                  unit: 'kWh',
                },
              ]}
            />
          )}
        </GridItem>
      </Grid>
    </Stack>
  )
}
