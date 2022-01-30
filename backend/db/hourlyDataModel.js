import mongoose from 'mongoose'

const hourlyDataSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String },
  year: Number,
  data: [Number],
})

export const HourlyData = mongoose.model('HourlyData', hourlyDataSchema)
