import isObject from 'lodash/isObject'
import { PaginatedQuery, Repository } from '../types'
import { Types } from 'mongoose'

export const valueConverter = (
  repo: Repository,
  field: string,
  value: any,
  useRegex = true,
) => {
  const valueType = typeof value

  if (valueType === 'boolean' || valueType === 'number') return value

  if (!value) return undefined

  if (Array.isArray(value))
    return { $in: value.map((val) => valueConverter(repo, field, val, false)) }

  if (valueType === 'object')
    Object.keys(value).forEach((key) => {
      value[key] = valueConverter(repo, field, value[key], useRegex)
    })

  if (repo.getFields('ObjectId').includes(field))
    return new Types.ObjectId(value)

  return useRegex ? { $regex: value, $options: 'i' } : value
}

export const mergeFilters = <T extends object>(
  repo: Repository,
  where: any,
  filters: PaginatedQuery<T>['filter'],
): T => {
  Object.keys(filters).map((key: string) => {
    const isDateField = repo.getFields('Date').includes(key)
    const val = valueConverter(repo, key, filters[key], !isDateField)
    if (val !== undefined) where[key] = val
  })

  return where
}

export const paginatedQueryToMongoFilter = <T extends {}, R extends Repository>(
  repo: R,
  query?: PaginatedQuery<T>,
) => {
  const result = {
    where: {},
    offset: query?.offset,
    limit: query?.limit,
    sort: query?.sort,
    select: undefined,
  }

  if (typeof query?.select === 'object' && !Array.isArray(query.select)) {
    result.select = {}
    Object.keys(query.select).forEach((key) => {
      result.select[key] = +query.select[key]
    })
  } else {
    result.select = query?.select
  }

  if (query?.query) {
    const regex = new RegExp(query.query, 'i')
    result.where['$or'] ||= []
    result.where['$or'].push(
      ...repo.getFields('String').map((fieldName) => ({ [fieldName]: regex })),
    )
  }

  if (query?.filter) {
    result.where = mergeFilters(repo, result.where, query.filter)
  }

  return result
}
