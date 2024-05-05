import { Request, Response } from 'express'
import { FindOperator } from 'typeorm'

import { TaskService } from '../services/task.service'
import { TaskStatus } from '../models/task.model'

export class TaskController {
  static async createTask(req: Request, res: Response) {
    try {
      const { id: userId } = req.user
      const { description, status, title } = req.body
      const task = await TaskService.createTask(
        userId,
        title,
        description,
        status
      )
      res.json(task)
    } catch (error) {
      if (error.name === 'DuplicateTaskError') res.status(400).json({ error: error.message })
      else res.status(500).json({ error: error.message })
    }
  }

  static async getTasks(req: Request, res: Response) {
    try {
      const { id: userId, role } = req.user
      const isAdmin = role === 'admin'
      const { cursor = 0, limit = 10, status, user } = req.query

      let statusFindOperator: FindOperator<TaskStatus> | undefined
      if (status) statusFindOperator = status as unknown as FindOperator<TaskStatus>

      const tasks = await TaskService.getTasks(
        userId,
        isAdmin,
        +cursor,
        +limit,
        { status: statusFindOperator },
        user ? +user : undefined
      )
      res.json(tasks)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async getTaskById(req: Request, res: Response) {
    try {
      const { id: userId, role } = req.user
      const { id: taskId } = req.params
      const isAdmin = role === 'admin'

      const task = await TaskService.getTaskById(
        parseInt(taskId, 10),
        userId,
        isAdmin
      )

      res.json(task)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const { id: userId, role } = req.user
      const { id: taskId } = req.params
      const { title, description, status } = req.body
      const isAdmin = role === 'admin'

      const updatedTask = await TaskService.updateTask(
        parseInt(taskId, 10),
        userId,
        title,
        description,
        status,
        isAdmin
      )

      res.json(updatedTask)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      const { id: userId, role } = req.user
      const { id: taskId } = req.params

      const isAdmin = role === 'admin'

      await TaskService.deleteTask(parseInt(taskId, 10), userId, isAdmin)
      
      res.json({ message: 'Task deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
