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
    console.log(error)
    res.status(400).json({ response: error, success: false })
  }
}

export const createProject = async (req, res, next) => {
  const { projectName, systemSize, systemAzimuth, systemInclination, pvgis, location, owner } = req.body.project
  console.log('[createProject]: started')
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
    console.log('created project', newProject)
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
  const { projectName, systemSize, systemAzimuth, systemInclination, pvgis, location } = req.body.project
  console.log('[updateProject]')
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
        updatedAt: new Date(),
      },
      { new: true }
    )
    // console.log('[updateProject] updated project', updatedProject)
    res.status(201).json({
      response: updatedProject,
      success: true,
    })
  } catch (error) {
    console.log('[updateProject] error', error)
    res.status(400).json({ response: error, success: false })
  }
}

export const getProjectById = async (req, res, next) => {
  const { projectId, userId } = req.params

  console.log('[getProjectById]')
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
