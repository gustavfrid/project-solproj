import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { hoursToDays, calcExportsHourly } from '../../utils/dataHandlers'

export const ReAreaChart = ({ dataSeries }) => {
  const loadDaily = dataSeries.load.daily
  const pvgisDaily = dataSeries.pvgis.daily
  const exportsDaily = hoursToDays(calcExportsHourly(dataSeries.load.hourly, dataSeries.pvgis.hourly))
  const data = pvgisDaily.map((prod, i) => ({ name: i + 1, prod: prod, load: loadDaily[i], export: exportsDaily[i] }))

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id='colorProd' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#ecc94b' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#ecc94b' stopOpacity={0} />
          </linearGradient>
          <linearGradient id='colorLoad' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
          </linearGradient>
          <linearGradient id='colorExport' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#b1a9a7' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#b1a9a7' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Area type='monotone' dataKey='prod' stroke='#ecc94b' fillOpacity={1} fill='url(#colorProd)' />
        <Area type='monotone' dataKey='load' stroke='#82ca9d' fillOpacity={1} fill='url(#colorLoad)' />
        <Area type='monotone' dataKey='export' stroke='#b1a9a7' fillOpacity={1} fill='url(#colorExport)' />
      </AreaChart>
    </ResponsiveContainer>
  )
}
