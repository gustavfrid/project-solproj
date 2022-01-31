export const hoursToDays = (data) => {
  let dataSeries = [...data]
  let result = []
  for (let i = 0; i < data.length / 24; i++) {
    const day = dataSeries.splice(0, 24).reduce((a, b) => a + b, 0)
    result.push(day)
  }
  // console.log('[hoursToDays], result: ', result)
  return result
}
