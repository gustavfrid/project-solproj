import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import routes from './routes/routes'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/solproj'
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
})
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to solproj backend, api served through /api')
})

app.use('/api', routes)

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}/api`)
})
