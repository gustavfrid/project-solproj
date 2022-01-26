import mongoose from 'mongoose'
import axios from 'axios'

const dayAheadPriceSchema = new mongoose.Schema({
  // SE1: [mongoose.Schema.Types.Decimal128],
  // SE2: [mongoose.Schema.Types.Decimal128],
  // SE3: [mongoose.Schema.Types.Decimal128],
  // SE4: [mongoose.Schema.Types.Decimal128],
  SE1: [Number],
  SE2: [Number],
  SE3: [Number],
  SE4: [Number],
})

const DayAheadPrice = mongoose.model('DayAheadPrice', dayAheadPriceSchema)

export const dataController = async (req, res, next) => {
  const { priceZone } = req.body

  if (priceZone) {
    try {
      const HourlyPrices = await DayAheadPrice.findById('61f05445117212bba8d1064b').select(priceZone)
      res.status(200).json({
        response: HourlyPrices,
        success: true,
      })
      next()
    } catch (error) {
      console.log(error)
      res.status(400).json({ response: error, success: false })
      next()
    }
  }
}

export const calculatePvgis = async (req, res, next) => {
  const { query, api, duration } = req.body

  let queryArr = []

  for (let key in query) {
    if (query.hasOwnProperty(key)) {
      queryArr.push(key + '=' + query[key])
    }
  }

  let pvgisQuery = `${api}?${queryArr.join('&')}`

  if (api === 'seriescalc') {
    pvgisQuery = `${pvgisQuery}&startyear=${duration.startyear}&endyear=${duration.endyear}`
  }

  try {
    const response = await axios.get(`https://re.jrc.ec.europa.eu/api/${pvgisQuery}`)
    res.send(response.data)
    next()
  } catch (error) {
    res.send(error.response.data)
    next()
  }
}
