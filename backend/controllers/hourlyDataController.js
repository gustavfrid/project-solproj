import axios from 'axios'
import { HourlyData } from '../db/hourlyDataModel'

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
  const { name } = req.params

  if (name) {
    try {
      const response = await HourlyData.findOne({ name })
      res.status(200).json({
        data: response.data,
        success: true,
      })
      next()
    } catch (error) {
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
    const hourlyProduction = response.data.outputs.hourly.map((hour) => hour.P)
    res.send({ data: { hourly: hourlyProduction } })
    next()
  } catch (error) {
    res.send(error.response.data)
    next()
  }
}
