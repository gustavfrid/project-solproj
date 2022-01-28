import axios from 'axios'
import { HourlyData } from '../db/hourlyDataModel'
// import prices from '../_local_assets/dayahead_prices_entsoe.json'

export const setupHourlyData = async (req, res, next) => {
  const { description, data } = req.body

  try {
    const newHourlyData = await new HourlyData({ description, data }).save()
    res.status(201).json({ success: true })
    next()
  } catch (error) {
    res.status(400).json({ response: error, success: false })
    next()
  }
}

export const getHourlyData = async (req, res, next) => {
  const { description } = req.body

  if (description) {
    try {
      const response = await HourlyData.findOne({ description })
      res.status(200).json({
        response,
        success: true,
      })
      next()
    } catch (error) {
      console.log(error)
      res.status(400).json({ error, success: false })
      next()
    }
  }
}

// TODO: move to a service?

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