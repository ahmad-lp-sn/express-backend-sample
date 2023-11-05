import { Response } from 'express'
import { usersService } from '../services'
import { CreatRequest, SearchRequest, User, UsersSearchQuery } from '../types'
import { SearchResponse } from '../helpers'

export const usersController = {
  create: async (req: CreatRequest<User>, res: Response<User>) => {
    const user = req.body

    const result = await usersService.create(user)

    res.status(201).send(result)
  },

  search: async (
    req: SearchRequest<UsersSearchQuery>,
    res: Response<SearchResponse<User>>,
  ) => {
    const query = req.query

    const result = await usersService.search(query)

    res.send(new SearchResponse(result, query.offset, query.limit)).status(201)
  },
}
