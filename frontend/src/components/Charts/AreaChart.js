import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Brush } from 'recharts'
import { hoursToDays } from '../../utils/dataHandlers'

export const ReAreaChart = ({ dataSeries }) => {
  const loadDaily = dataSeries.load.daily
  const pvgisDaily = dataSeries.pvgis.daily

  const exportsDaily = hoursToDays(
    dataSeries.load.hourly.map((v, i) => v - dataSeries.pvgis.hourly[i]).map((hour) => (hour > 0 ? 0 : hour))
  )

  const data = pvgisDaily.map((prod, i) => ({ name: i + 1, prod: prod, load: loadDaily[i], export: exportsDaily[i] }))
  const [opacity, setOpacity] = useState({ load: 0.3, prod: 0.3, export: 0.3 })

  const handleMouseEnter = (o) => {
    const { dataKey } = o
    setOpacity({ ...opacity, [dataKey]: 1 })
  }

  const handleMouseLeave = (o) => {
    const { dataKey } = o
    setOpacity({ ...opacity, [dataKey]: 0.3 })
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id='colorProd' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#ecc94b' stopOpacity={1} />
            <stop offset='95%' stopColor='#ecc94b' stopOpacity={1} />
          </linearGradient>
          <linearGradient id='colorLoad' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#82ca9d' stopOpacity={1} />
            <stop offset='95%' stopColor='#82ca9d' stopOpacity={1} />
          </linearGradient>
          <linearGradient id='colorExport' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#b1a9a7' stopOpacity={1} />
            <stop offset='95%' stopColor='#b1a9a7' stopOpacity={1} />
          </linearGradient>
        </defs>
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <Brush dataKey='name' height={30} stroke='#8884d8' />
        <Area type='monotone' dataKey='export' stroke='#b1a9a7' fillOpacity={opacity.export} fill='url(#colorExport)' />
        <Area type='monotone' dataKey='load' stroke='#82ca9d' fillOpacity={opacity.load} fill='url(#colorLoad)' />
        <Area type='monotone' dataKey='prod' stroke='#ecc94b' fillOpacity={opacity.prod} fill='url(#colorProd)' />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export const ReAreaChartT = ({ data, axisX, axisY }) => {
  const [opacity, setOpacity] = useState({ ...data.reduce((a, b) => ({ ...a, [b.name]: b.opacity }), {}) })

  if (!axisX) axisX = Array.from({ length: data[0].data.length }, (_, i) => i + 1)
  const dataSeries = axisX.map((v, i) => ({
    ...data.reduce((a, b) => ({ ...a, name: v, [b.name]: b.data[i] }), {}),
  }))

  const handleMouseEnter = (o) => {
    const { dataKey } = o
    setOpacity({ ...opacity, [dataKey]: 1 })
  }

  const handleMouseLeave = (o) => {
    const { dataKey } = o
    setOpacity({ ...opacity, [dataKey]: 0.5 })
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart width={730} height={250} data={dataSeries} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
        <defs>
          {data.map((v) => (
            <linearGradient id={`color${v.name}`} x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={v.stopColor} stopOpacity={1} />
              <stop offset='95%' stopColor={v.stopColor} stopOpacity={0.3} />
            </linearGradient>
          ))}
        </defs>
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        <Brush dataKey='name' height={30} stroke='#696773ff' />
        {data.map((v) => (
          <Area
            type='monotone'
            dataKey={v.name}
            stroke={v.stroke}
            fillOpacity={opacity[v.name]}
            // fill={v.fill}
            fill={`url(#color${v.name})`}
            unit={v.unit}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}
