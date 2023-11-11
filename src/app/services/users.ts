import { errors } from '../constants'
import { paginatedQueryToMongoFilter } from '../helpers'
import { usersRepository } from '../models'
import { User } from '../types'
import { UsersSearchQuery } from '../types'

export const usersService = {
  create: async (userData: User) => {
    const user = await usersRepository.findOne({ email: userData.email }).exec()

    if (user) {
      throw errors.USER_ERR.USED_EMAIL
    }

    return (await usersRepository.create(userData)).toObject()
  },

  search: async (query: UsersSearchQuery) => {
    const mongoFilrer = paginatedQueryToMongoFilter(usersRepository, query)

    const resultPromise = usersRepository
      .find(mongoFilrer.where)
      .select(mongoFilrer.select)
      .skip(mongoFilrer.offset)
      .limit(mongoFilrer.limit)
      .sort(mongoFilrer.sort)
      .lean()
      .exec()

    const countPromise = usersRepository
      .countDocuments(mongoFilrer.where)
      .exec()

    return await Promise.all([resultPromise, countPromise])
  },
}
