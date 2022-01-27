import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    default: 'user',
  },
  password: { type: String, required: true },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
})

export const User = mongoose.model('User', userSchema)

const RoleSchema = mongoose.Schema({
  description: String,
})

export const Role = mongoose.model('Role', RoleSchema)
