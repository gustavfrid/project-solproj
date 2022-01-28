import express from 'express'
import { auth, signin, signup, createRole } from '../controllers/userController'
import { setupHourlyData, getHourlyData, calculatePvgis } from '../controllers/hourlyDataController'
import { getProjectList, createProject, updateProject, getProjectById } from '../controllers/projectController'

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.send('Welcome to solproj API')
  next()
})

router.post('/setup', setupHourlyData) // setup data seeding
router.post('/setup/role', createRole) // setup roles
router.get('/data', auth, getHourlyData) // get hourly data

router.post('/signup', signup) // create user
router.post('/signin', signin) // check password & signin
router.post('/project', auth, getProjectList) // get list of projects
router.post('/project/new', auth, createProject) // create project
router.post('/project/:userId/:projectId', auth, updateProject) // update project
router.get('/project/:userId/:projectId', auth, getProjectById) // get single project by id
router.post('/pvgis', auth, calculatePvgis) // calculate energi with pvgis API

module.exports = router
