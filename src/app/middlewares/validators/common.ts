import Joi from 'joi'
import { isValidObjectId } from 'mongoose'

export const PositiveInt = (min = 1) => Joi.number().integer().min(min)

export const ObjecctIdStr = Joi.string().custom((value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message({ custom: 'Invalid ObjectId' })
  }
  return value
})

export const DateRange = Joi.object({
  $gte: Joi.date(),
  $lte: Joi.date(),
  $gt: Joi.date(),
  $lt: Joi.date(),
})

export const paginated = {
  page: PositiveInt(),
  size: PositiveInt(),
  limit: Joi.number(),
  offset: Joi.number(),
  query: Joi.string(),
  sort: Joi.string(),
  select: Joi.object().pattern(/./, Joi.number().valid(0, 1)),
}
