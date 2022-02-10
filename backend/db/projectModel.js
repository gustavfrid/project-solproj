import mongoose from 'mongoose'

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  // properties: {}
})

const polygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Polygon'],
    required: true,
  },
  coordinates: {
    type: [[[Number]]], // Array of arrays of arrays of numbers
    required: true,
  },
})

const ProjectSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
  projectName: {
    type: String,
    required: true,
  },
  location: { type: [Number], required: true },
  mapStyle: String,
  viewState: Object,
  mapFeatures: Object,
  systemSize: Number,
  systemAzimuth: Number,
  systemInclination: Number,
  yearlyLoad: Number,
  loadProfile: String,
  pvgis: {},
})

export const Project = mongoose.model('Project', ProjectSchema)
