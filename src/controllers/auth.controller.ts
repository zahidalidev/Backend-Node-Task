import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { AuthService } from '../services/auth.service'
import { JWT_SECRET, JWT_TOKEN_EXPIRATION } from '../config/env'

export class AuthController {
  static async signUp(req: Request, res: Response) {
    try {
      const { email, password, inviteToken } = req.body
      const user = await AuthService.signUp(email, password, inviteToken)
      res.json(user)
    } catch (error) {
      if (error.name === 'UnauthorizedError')
        res.status(401).json({ error: 'Unauthorized' })
      else if (error.name === 'ForbiddenError')
        res.status(403).json({ error: 'Forbidden - User does not have a valid invitation' })
      else res.status(500).json({ error: error.message })
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const { userId, role } = await AuthService.login(email, password)

      const token = jwt.sign({ userId, role }, JWT_SECRET, {
        expiresIn: JWT_TOKEN_EXPIRATION
      })

      res.json({ token })
    } catch (error) {
      res.status(401).json({ error: 'Invalid credentials' })
    }
  }
}
