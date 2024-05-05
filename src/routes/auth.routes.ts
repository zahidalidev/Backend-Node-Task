import express from 'express'

import { AuthController } from '../controllers/auth.controller'

const router = express.Router()

router.post('/signup', AuthController.signUp)
router.post('/login', AuthController.login)

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
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
 * /auth/signup:
 *   post:
 *     summary: Create a new user with an invitation.
 *     tags: [Authentication]
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
 *               password:
 *                 type: string
 *               inviteToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden - User does not have a valid invitation.
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user.
 *     tags: [Authentication]
 *     security:
 *       - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Unauthorized.
 */

export default router
