import mongoose, { Schema } from 'mongoose'
import { UserDocument, UserModel, UserSchema } from '../types/mongoose-types'
import { defaultSchemaOptions } from './common'
import { UsersRepository } from '../types'

export const userSchema: UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
  },
  defaultSchemaOptions,
)

export const usersRepository = mongoose.model<UserDocument, UsersRepository>(
  'User',
  userSchema,
  'user',
)
