import { Meta, SearchResponse } from '../../app/helpers'

describe('Meta and SearchResponse classes', () => {
  it('should create a valid SearchResponse instance', () => {
    const data = [1, 2, 3, 4, 5]
    const count = 5
    const offset = 10
    const limit = 10

    const searchResponse = new SearchResponse([data, count], offset, limit)

    expect(searchResponse.data).toEqual(data)
    expect(searchResponse.meta.currentPage).toBe(2) // Math.ceil(10 / 10) + 1
    expect(searchResponse.meta.lastPage).toBe(1) // Math.ceil(5 / 10)
    expect(searchResponse.meta.perPage).toBe(limit)
    expect(searchResponse.meta.total).toBe(count)
  })
})
