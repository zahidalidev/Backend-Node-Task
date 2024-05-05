import express from 'express'

import { UserController } from '../controllers/user.controller'
import { authenticateUser } from '../middleware/auth.middleware'

const router = express.Router()

router.get('/', authenticateUser, UserController.getUsers)

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for users
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
 * /users:
 *   get:
 *     summary: Get all users.
 *     tags: [Users]
 *     security:
 *       - bearerToken: [] # Bearer token is required
 *     parameters:
 *       - in: query
 *         name: cursor
 *         description: Cursor for pagination.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: Maximum number of users to return.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of users.
 *       500:
 *         description: Internal server error.
 */

export default router
