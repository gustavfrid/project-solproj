import express from 'express'
import { testController } from '../controllers/controllers.index'

const router = express.Router()

router.get('/test', testController)

module.exports = router
