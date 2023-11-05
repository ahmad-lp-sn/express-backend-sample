import Joi from 'joi'
import validator from './validator'
import { DateRange, ObjecctIdStr, paginated } from './common'

const createReqSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
  }).required(),
})

const searchReqSchema = Joi.object({
  query: Joi.object({
    filter: {
      _id: Joi.alternatives(ObjecctIdStr, Joi.array().items(ObjecctIdStr)),
      email: Joi.alternatives(
        Joi.string(),
        Joi.array().items(Joi.string().email()),
      ),
      name: Joi.string(),
      createdAt: DateRange,
      updatedAt: DateRange,
    },
    ...paginated,
  }).required(),
})

export const usersValidators = {
  create: validator(createReqSchema),
  search: validator(searchReqSchema),
}
