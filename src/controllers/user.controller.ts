import { Request, Response } from 'express'

import { UserService } from '../services/user.service'

export class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const { role } = req.user
      const isAdmin = role === 'admin'
      const { cursor = 0, limit = 10 } = req.query

      const users = await UserService.getUsers(isAdmin, +cursor, +limit)
      
      res.json(users)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
