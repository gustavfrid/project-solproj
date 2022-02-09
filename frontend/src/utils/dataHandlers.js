export const roundValue = (value, digits) => {
  if (!digits) return Math.round((value + Number.EPSILON) * 100) / 100
  return Math.round((value + Number.EPSILON) * (10 ^ digits)) / (10 ^ digits)
}

export const hoursToDays = (hourlyData) => {
  let dataSeries = [...hourlyData]
  let result = []
  for (let i = 0; i < hourlyData.length / 24; i++) {
    const day = dataSeries.splice(0, 24).reduce((a, b) => a + b, 0)
    const roundDay = Math.round((day + Number.EPSILON) * 100) / 100
    result.push(roundDay)
  }
  return result
}

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export const hoursToMonths = (hourlyData) => {
  let dataSeries = [...hourlyData]
  let result = []
  for (let i = 0; i < daysInMonth.length; i++) {
    const month = dataSeries.splice(0, daysInMonth[i] * 24).reduce((a, b) => a + b, 0)
    const roundMonth = Math.round((month + Number.EPSILON) * 100) / 100
    result.push(roundMonth)
  }
  return result
}

export const hoursToYear = (hourlyData) => {
  let dataSeries = [...hourlyData]
  const year = dataSeries.reduce((a, b) => a + b, 0)
  const roundYear = Math.round((year + Number.EPSILON) * 1) / 1
  return roundYear
}

export const divideArrayByNumber = (array, number) => {
  let dataSeries = [...array]
  return dataSeries.map((v) => v / number)
}

export const dateArray = () => {
  return daysInMonth
    .map((v, i, a) => {
      let day = []
      for (let j = 1; j <= v; j++) {
        day.push(`${j}/${i + 1}`)
      }
      return day
    })
    .reduce((a, b) => [...a, ...b])
}
