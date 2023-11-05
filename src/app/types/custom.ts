import { PaginatedQuery, Repository } from './common'
import { UserModel } from './mongoose-types'

export type UsersRepository = Repository<
  UserModel,
  {
    // UsersRepository statics types
  }
>

export type UsersSearchQuery = PaginatedQuery<{
  id: string | string[]
  email: string | string[]
}>
