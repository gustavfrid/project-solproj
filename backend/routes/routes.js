import express from 'express'
import { auth, signin, signup, createRole } from '../controllers/userController'
import { setupHourlyData, getHourlyData, calculatePvgis } from '../controllers/hourlyDataController'
import { getProjects, createProject, getProjectById } from '../controllers/projectController'

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.send('Welcome to solproj API')
  next()
})

router.post('/setup', setupHourlyData) // setup data seeding
router.get('/data', auth, getHourlyData)

router.post('/signup', signup) // create user
router.post('/signin', signin) // check password & signin
router.get('/project', auth, getProjects) // get list of projects
router.post('/project', auth, createProject) // create project
router.get('/project', auth, getProjectById) // get singel project by id
router.post('/pvgis', auth, calculatePvgis) // calculate energi with pvgis API
router.post('/setup/role', createRole)

module.exports = router
