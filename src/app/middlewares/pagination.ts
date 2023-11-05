import { config } from '../config'
import { PaginatedQuery, SearchRequest } from '../types'

export const pagination = (req: SearchRequest, _, next) => {
  req.query.page = +req.query.page || 1
  req.query.size = +req.query.size || config.defaultPageSize

  req.query.limit = +req.query.limit || req.query.size
  req.query.offset = +req.query.offset || (req.query.page - 1) * req.query.limit

  next()
}
