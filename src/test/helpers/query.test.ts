import {
  mergeFilters,
  paginatedQueryToMongoFilter,
  valueConverter,
} from '../../app/helpers'
import { PaginatedQuery } from '../../app/types'

describe('Query Functions', () => {
  const repo = {
    getFields: (type: string) => [],
  }
  describe('valueConverter', () => {
    it('should return boolean or number values as is', () => {
      expect(valueConverter(repo, 'field', true)).toBe(true)
      expect(valueConverter(repo, 'field', 42)).toBe(42)
    })

    it('should return undefined for null,undefined or empty str values', () => {
      expect(valueConverter(repo, 'field', null)).toBeUndefined()
      expect(valueConverter(repo, 'field', undefined)).toBeUndefined()
      expect(valueConverter(repo, 'field', '')).toBeUndefined()
    })

    it('should convert arrays into $in queries', () => {
      expect(valueConverter(repo, 'field', [1, 2, 3])).toEqual({
        $in: [1, 2, 3],
      })
    })

    it('should convert objects recursively', () => {
      const obj = { key: true, value: 1 }
      const result = valueConverter(repo, 'field', obj, false)
      expect(result).toBe(obj)
    })

    it('should convert string values into regex queries', () => {
      expect(valueConverter(repo, 'field', 'abc', true)).toEqual({
        $regex: 'abc',
        $options: 'i',
      })
    })

    it('should convert string values into non-regex queries if useRegex is false', () => {
      expect(valueConverter(repo, 'field', 'abc', false)).toEqual('abc')
    })

    it('should convert string values into Types.ObjectId if the field is of type "ObjectId"', () => {
      const repo = {
        getFields: (type: string) => (type === 'ObjectId' ? ['field'] : []),
      }
      const objectIdValue = '604f675db12a2d273cc11d71'
      const result = valueConverter(repo, 'field', objectIdValue)
      expect(result.constructor.name).toBe('ObjectId')
      expect(result.toHexString()).toBe(objectIdValue)
    })
  })

  describe('mergeFilters', () => {
    it('should merge filters into the "where" object', () => {
      const repo = {
        getFields: (type: string) => [],
      }
      const filters = {
        field1: false,
        field2: 4,
      }
      const where = mergeFilters(repo, {}, filters)
      expect(where).toEqual(filters)
    })

    it('should not merge undefined values', () => {
      const repo = {
        getFields: (type: string) => [],
      }
      const filters = {
        field1: undefined,
        field2: 1,
      }
      const where = mergeFilters(repo, {}, filters)
      expect(where).toEqual({ field2: 1 })
    })
  })

  describe('paginatedQueryToMongoFilter', () => {
    it('should construct a MongoDB filter object from a PaginatedQuery', () => {
      const repo = {
        getFields: (type: string) =>
          type === 'Date' ? ['field1'] : type === 'String' ? ['field2'] : [],
      }
      const query = {
        offset: 10,
        limit: 20,
        sort: 'field1',
        select: { field1: 1, field2: 1 } as PaginatedQuery['select'],
        query: 'search',
        filter: {
          field1: 'value1',
          field2: 'value2',
        },
      }

      const result = paginatedQueryToMongoFilter(repo, query as PaginatedQuery)

      expect(result).toEqual({
        where: {
          $or: [{ field2: /search/i }],
          field1: 'value1',
          field2: { $regex: 'value2', $options: 'i' },
        },
        offset: 10,
        limit: 20,
        sort: 'field1',
        select: { field1: 1, field2: 1 },
      })
    })
  })
})
