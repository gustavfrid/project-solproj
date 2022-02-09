import React, { useCallback, useState } from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts'

const renderActiveShape = (props) => {
  // const RADIAN = Math.PI / 180
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props // midAngle,
  // const sin = Math.sin(-RADIAN * midAngle)
  // const cos = Math.cos(-RADIAN * midAngle)
  // const sx = cx + (outerRadius + 10) * cos
  // const sy = cy + (outerRadius + 10) * sin
  // const mx = cx + (outerRadius + 30) * cos
  // const my = cy + (outerRadius + 30) * sin
  // const ex = mx + (cos >= 0 ? 1 : -1) * 22
  // const ey = my
  // const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy - 20} dy={8} textAnchor='middle' fill={'#333'}>
        <tspan>{payload.name}</tspan>
      </text>
      <text x={cx} y={cy + 6} textAnchor='middle'>
        <tspan>{value} kWh</tspan>
      </text>
      <text x={cx} y={cy + 25} textAnchor='middle'>
        <tspan>{`(${Math.round(percent * 100)}%)`}</tspan>
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      {/* <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' /> */}
      {/* <text x={cx} y={cy} textAnchor={textAnchor} fill='#333'>{`${value}`}</text> */}
      {/* <text x={cx} y={cy} dy={18} textAnchor={textAnchor} fill='#999'>
        {`(Rate ${roundValue(percent * 100, 1)}%)`}
      </text> */}
    </g>
  )
}

export const RePieChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index)
    },
    [setActiveIndex]
  )

  return (
    <ResponsiveContainer height={200} width='100%'>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx='50%'
          cy='50%'
          innerRadius='70%'
          outerRadius='90%'
          fill='#f9eec7'
          dataKey='value'
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
