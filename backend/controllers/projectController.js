import { Project } from '../db/projectModel'

export const getProjectList = async (req, res, next) => {
  const { userId } = req.body
  try {
    const projectList = await Project.find({ owner: userId }).sort({ updatedAt: -1 })
    res.status(201).json({
      response: projectList,
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}

export const createProject = async (req, res, next) => {
  const { projectName, systemSize, systemAzimuth, systemInclination, yearlyLoad, pvgis, location, owner, loadProfile } =
    req.body.project
  try {
    const newProject = await new Project({
      owner,
      projectName,
      location,
      systemSize,
      systemAzimuth,
      systemInclination,
      yearlyLoad,
      loadProfile,
      pvgis,
    }).save()
    res.status(201).json({
      response: newProject,
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}

export const updateProject = async (req, res, next) => {
  const { projectId } = req.params
  const { projectName, systemSize, systemAzimuth, systemInclination, pvgis, location, yearlyLoad } = req.body.project
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        projectName,
        location,
        systemSize,
        systemAzimuth,
        systemInclination,
        pvgis,
        yearlyLoad,
        updatedAt: new Date(),
      },
      { new: true }
    )
    res.status(201).json({
      response: updatedProject,
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}

export const getProjectById = async (req, res, next) => {
  const { projectId, userId } = req.params

  try {
    const project = await Project.findOne({ _id: projectId, owner: userId })
    res.status(201).json({
      response: project,
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}

export const deletProject = async (req, res, next) => {
  const { projectId, userId } = req.params
  try {
    const response = await Project.deleteOne({ _id: projectId, owner: userId })
    res.status(201).json({
      response,
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}
