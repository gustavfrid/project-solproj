import { Icon } from '@chakra-ui/react'

export const AdjustbleAngle = ({ angle, ...props }) => (
  <Icon viewBox='0 0 200 200' {...props}>
    <g transform={`translate(${200 * 0.05},${200 * 0.95})`}>
      <line x1='0' y1='0' x2={`${200 * 0.75}`} y2='0' stroke='black' strokeWidth='4' transform={`rotate(${-angle})`} />
    </g>
  </Icon>
)

export const AdjustbleArrow = ({ angle, ...props }) => (
  <Icon viewBox='0 0 200 200' {...props}>
    <g transform={`translate(100,100) rotate(${-angle})`}>
      <line x1='0' y1='-90' x2='0' y2='90' stroke='black' strokeWidth='4' />
      <line x1='0' y1='0' x2='0' y2='90' stroke='black' strokeWidth='4' transform='translate(0,90) rotate(-135)' />
      <line x1='0' y1='0' x2='0' y2='90' stroke='black' strokeWidth='4' transform='translate(0,90) rotate(135)' />
    </g>
  </Icon>
)
