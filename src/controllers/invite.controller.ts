import { Request, Response } from 'express'

import { AuthService } from '../services/auth.service'
import { isValidEmailFormat } from '../utils/helpers'

export class InviteController {
  static async createInvite(req: Request, res: Response) {
    try {
      if (req.user.role !== 'admin') {
        return res
          .status(403)
          .json({ error: 'Forbidden - Only admin can create invites' })
      }

      const { email } = req.body
      const adminId = req.user.id

      if (!isValidEmailFormat(email))
        return res.status(400).json({ error: 'Invalid email format' })

      const invite = await AuthService.createInvite(adminId, email)

      res.json(invite)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
