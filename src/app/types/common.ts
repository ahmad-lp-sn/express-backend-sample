import { Request } from 'express'

export type CommonRepoStatics = {
  getFields(type: 'String' | 'ObjectId' | 'Date'): string[]
}

export type Repository<T = unknown, Repo = unknown> = CommonRepoStatics &
  Repo &
  Omit<T, keyof (Repo | CommonRepoStatics)>

export type PaginatedQuery<Filter = never> = {
  filter?: Filter
  query?: string
  select?: string | string[] | Record<string, number>
  sort?: string
  page: number
  size: number
  offset: number
  limit: number
}

export type CreatRequest<
  Body = never,
  Params = never,
  Query = never,
  Result = Body,
> = Request<Params, Body, Result, Query>

export type SearchRequest<
  Query = PaginatedQuery,
  Body = never,
  Params = never,
  Result = never,
> = Request<Params, Body, Result, Query>
