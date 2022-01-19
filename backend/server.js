import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import axios from 'axios'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/solproj'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
mongoose.Promise = Promise

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
})

const User = mongoose.model('User', UserSchema)

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// check is accesstoken was sent with the request
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')
  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next()
    } else {
      res.status(404).json({ response: 'Please log in', success: false })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Welcome to solproj API')
})

app.post('/signup', async (req, res) => {
  const { username, password } = req.body
  try {
    const salt = bcrypt.genSaltSync()

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt), //, salt
    }).save()

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
      },
      success: true,
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

app.post('/signin', async (req, res) => {
  const { username, password } = req.body
  // console.log(req.body)

  try {
    const user = await User.findOne({ username })
    // console.log(user)
    if (user && bcrypt.compareSync(password, user.password)) {
      // console.log('password correct')
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
        },
        success: true,
      })
    } else {
      res.status(404).json({ response: 'User not found', success: false })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// proxy to get PVGIS calculations
// app.get('/pvgis', authenticateUser)
app.post('/pvgis', async (req, res) => {
  const { query, api, duration } = req.body

  let queryArr = []
  for (let key in query) {
    if (query.hasOwnProperty(key)) {
      queryArr.push(key + '=' + query[key])
    }
  }
  let pvgisQuery = `${api}?${queryArr.join('&')}`
  if (api === 'seriescalc') {
    pvgisQuery = `${pvgisQuery}&startyear=${duration.startyear}&endyear=${duration.endyear}`
  }
  try {
    const response = await axios.get(`https://re.jrc.ec.europa.eu/api/${pvgisQuery}`)
    res.send(response.data)
  } catch (error) {
    res.send(error.response.data)
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
