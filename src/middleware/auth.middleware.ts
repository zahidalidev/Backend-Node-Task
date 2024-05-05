import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/env'

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; role: 'admin' | 'user' }
    }
  }
}

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  try {
    // Verify JWT token
    const decodedToken = jwt.verify(token, JWT_SECRET) as {
      userId: number
      role: 'admin' | 'user'
    }

    req.user = {
      id: decodedToken.userId,
      role: decodedToken.role
    }

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
