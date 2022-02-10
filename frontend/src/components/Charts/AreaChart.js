import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Brush } from 'recharts'

export const ReAreaChart = ({ data, axisX, axisY }) => {
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
            <linearGradient key={v.name} id={`color${v.name}`} x1='0' y1='0' x2='0' y2='1'>
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
            key={v.name}
            type='monotone'
            dataKey={v.name}
            stroke={v.stroke}
            fillOpacity={opacity[v.name]}
            fill={`url(#color${v.name})`}
            unit={v.unit}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}
