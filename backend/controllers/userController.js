import bcrypt from 'bcrypt'

import { User, Role } from '../db/userModel'

// check if accesstoken was sent with the request
export const auth = async (req, res, next) => {
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

export const signup = async (req, res, next) => {
  const { username, password } = req.body
  console.log('signup')
  try {
    const salt = bcrypt.genSaltSync()

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt), //, salt
      role: '61f1a947794ba48500cb4f4b',
    }).save()

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
      },
      success: true,
    })
    next()
  } catch (error) {
    console.log('signup fail')
    res.status(400).json({ response: error, success: false })
  }
}

export const signin = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
        },
        success: true,
      })
      next()
    } else {
      res.status(404).json({ response: 'User not found', success: false })
      next()
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}

export const createRole = async (req, res, next) => {
  const { description } = req.body

  try {
    const newRole = await new Role({ description }).save()

    res.status(201).json({
      response: { newRole },
      success: true,
    })
    next()
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}
