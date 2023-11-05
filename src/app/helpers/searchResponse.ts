export class Meta {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
}

export class SearchResponse<T> {
  data: T[]
  meta: Meta

  constructor(
    [data, count]: [data: T[], count: number],
    offset: number,
    limit: number,
  ) {
    this.data = data
    this.meta = {
      currentPage: Math.ceil(offset / limit) + 1,
      lastPage: Math.ceil((count || 1) / limit),
      perPage: limit,
      total: count,
    }
  }
}
