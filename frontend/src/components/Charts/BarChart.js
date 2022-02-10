import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export const ReBarChart = ({ data, axisX }) => {
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
      <BarChart
        width={500}
        height={300}
        data={dataSeries}
        stackOffset='sign'
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 30,
        }}>
        <defs>
          {data.map((v) => (
            <linearGradient key={v.name} id={`color${v.name}`} x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={v.stopColor} stopOpacity={1} />
              <stop offset='95%' stopColor={v.stopColor} stopOpacity={0.3} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        {data.map((v, i) => (
          <Bar
            key={v.name}
            dataKey={v.name}
            stackId={v.stack}
            fill={`url(#color${v.name})`}
            fillOpacity={opacity[v.name]}
            stroke={v.stroke}
            unit={v.unit}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
