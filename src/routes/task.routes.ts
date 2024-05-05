import express from 'express'

import { TaskController } from '../controllers/task.controller'
import { authenticateUser } from '../middleware/auth.middleware'

const router = express.Router()

router.get('/', authenticateUser, TaskController.getTasks)
router.get('/:id', authenticateUser, TaskController.getTaskById)
router.post('/', authenticateUser, TaskController.createTask)
router.put('/:id', authenticateUser, TaskController.updateTask)
router.delete('/:id', authenticateUser, TaskController.deleteTask)

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API endpoints for tasks
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
 * /tasks:
 *   get:
 *     summary: Get all tasks.
 *     tags: [Tasks]
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
 *         description: Maximum number of tasks to return.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         description: Filter tasks by status (pending or completed).
 *         schema:
 *           type: string
 *       - in: query
 *         name: user
 *         description: Filter tasks by user ID.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of tasks.
 *       401:
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID.
 *     tags: [Tasks]
 *     security:
 *       - bearerToken: [] # Bearer token is required
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task found.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task.
 *     tags: [Tasks]
 *     security:
 *       - bearerToken: [] # Bearer token is required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *     responses:
 *       200:
 *         description: Task created successfully.
 *       400:
 *         description: Bad request - Invalid request body.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task.
 *     tags: [Tasks]
 *     security:
 *       - bearerToken: [] # Bearer token is required
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden - User is not authorized to update this task.
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task.
 *     tags: [Tasks]
 *     security:
 *       - bearerToken: [] # Bearer token is required
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden - User is not authorized to delete this task.
 */

export default router
