import prices from '../large_data_sets/dayahead_prices_entsoe.json'

export const setupController = async (req, res, next) => {
  const { SE1, SE2, SE3, SE4 } = prices

  try {
    const newPrices = await new DayAheadPrice({ SE1, SE2, SE3, SE4 }).save()
    res.status(201).json({ success: true })
    next()
  } catch (error) {
    res.status(400).json({ success: false })
    next()
  }
}
