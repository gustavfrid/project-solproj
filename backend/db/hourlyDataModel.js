import mongoose from 'mongoose'

const hourlyDataSchema = new mongoose.Schema({
  description: { type: String, required: true, unique: true },
  data: [Number],
})

export const HourlyData = mongoose.model('HourlyData', hourlyDataSchema)
