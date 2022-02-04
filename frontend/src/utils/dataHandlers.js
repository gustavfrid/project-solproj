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

export const hoursToMonths = (hourlyData) => {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
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
  const roundYear = Math.round((year + Number.EPSILON) * 100) / 100
  return roundYear
}

export const calcExportsHourly = (hourlyLoad, hourlyProd) => {
  const hourlyExportedElectricity = hourlyProd.map((v, i) => v - hourlyLoad[i])
  return hourlyExportedElectricity
}

// TODO: add function to sum everything to weeks and days
