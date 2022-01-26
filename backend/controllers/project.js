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
  // owner: {},
  // created_at: { type: Date, default: new Date() },
  // updated_at: { type: Date },
  projectName: {
    type: String,
    unique: true,
    required: true,
  },
  location: {
    type: pointSchema,
    required: true,
  },
  systemSize: Number,
  systemAzimuth: Number,
  systemInclination: Number,
  pvgis: [Number],
})
const Project = mongoose.model('Project', ProjectSchema)

export const getProjects = async (req, res, next) => {
  const { userId } = req.body
  try {
    const projectList = await Project.find()
    res.status(201).json({
      response: projectList,
      success: true,
    })
    next()
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}

export const createProject = async (req, res, next) => {
  const { projectName, systemSize, systemAzimuth, systemInclination, pvgis, location } = req.body.project

  try {
    const newProject = await new Project({
      projectName,
      location: location,
      systemSize,
      systemAzimuth,
      systemInclination,
      pvgis,
    }).save()
    res.status(201).json({
      response: newProject,
      success: true,
    })
    next()
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}
