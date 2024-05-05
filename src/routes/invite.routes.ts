import express from 'express'

import { InviteController } from '../controllers/invite.controller'
import { authenticateUser } from '../middleware/auth.middleware'

const router = express.Router()

router.post('/', authenticateUser, InviteController.createInvite)

/**
 * @swagger
 * tags:
 *   name: Invites
 *   description: API endpoints for managing invites
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerToken:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   security:
 *     - bearerToken: []
 */

/**
 * @swagger
 * /invites:
 *   post:
 *     summary: Create a new invite.
 *     tags: [Invites]
 *     security:
 *       - bearerToken: [] # Bearer token is required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Invite created successfully.
 *       400:
 *         description: Bad request - Invalid request body.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden - Only admin can create invites.
 *       500:
 *         description: Internal server error.
 */

export default router
