import { Project } from '../db/projectModel'

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
  const { projectName, systemSize, systemAzimuth, systemInclination, pvgis, location, owner } = req.body.project

  try {
    const newProject = await new Project({
      owner,
      projectName,
      location,
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

export const getProjectById = async (req, res, next) => {
  const { projectId, userId } = req.body
  try {
    const project = await Project.find({ _id: projectId, owner: userId })
    res.status(201).json({
      response: project,
      success: true,
    })
    next()
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}
