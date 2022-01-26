import express from 'express'
import { auth, signin, signup } from '../controllers/auth'
import { testController, welcomeController } from '../controllers/index'
import { setupController } from '../controllers/setup'
import { dataController, calculatePvgis } from '../controllers/data'
import { getProjects, createProject } from '../controllers/project'

const router = express.Router()

router.get('/', welcomeController)
router.get('/test', testController)
router.post('/setup', setupController)

router.get('/data', auth, dataController)

router.post('/signup', signup)
router.post('/signin', signin)

router.get('/project', auth, getProjects)
router.post('/project', auth, createProject)

router.get('/pvgis', auth, calculatePvgis)

module.exports = router
