import { FindManyOptions, MoreThan } from 'typeorm'

import { DataSource } from '../config/database'
import { User } from '../models/user.model'

export class UserService {
  static async getUsers(isAdmin: boolean, cursor: number, limit: number) {
    if (!isAdmin) throw new Error('Unauthorized')

    const userRepository = DataSource.getRepository(User)
    let users: User[]

    const findOptions: FindManyOptions<User> = {
      order: { id: 'ASC' },
      take: limit + 1
    }

    if (cursor)
      findOptions.where = {
        id: MoreThan(cursor)
      }

    users = await userRepository.find(findOptions)

    return {
      users: users.slice(0, limit),
      hasNextPage: users.length > limit
    }
  }
}
