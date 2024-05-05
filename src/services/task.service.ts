import { FindManyOptions, FindOperator, MoreThan } from 'typeorm'

import { DataSource } from '../config/database'
import { Task, TaskStatus } from '../models/task.model'

export class TaskService {
  static async createTask(
    userId: number,
    title: string,
    description: string,
    status: TaskStatus
  ) {
    const taskRepository = DataSource.getRepository(Task)

    const existingTask = await taskRepository.findOne({ where: { title } })
    if (existingTask) {
      const error = new Error('Task with the same title already exists')
      error.name = 'DuplicateTaskError'
      throw error
    }

    const newTask = taskRepository.create({
      title,
      description,
      status,
      user: { id: userId }
    })

    await taskRepository.save(newTask)
    return newTask
  }

  static async getTasks(
    userId: number,
    isAdmin: boolean,
    cursor: number,
    limit: number,
    filters?: { status?: FindOperator<TaskStatus> },
    userFilter?: number
  ) {
    const taskRepository = DataSource.getRepository(Task)
    let tasks: Task[]

    const findOptions: FindManyOptions<Task> = {
      where: isAdmin ? {} : { user: { id: userId } },
      order: { id: 'ASC' },
      take: limit + 1
    }

    if (filters && filters.status) {
      findOptions.where = {
        ...findOptions.where,
        status: filters.status
      }
    }

    if (userFilter) {
      findOptions.where = {
        ...findOptions.where,
        user: { id: userFilter }
      }
    }

    // Cursor-based pagination
    if (cursor) {
      findOptions.where = {
        ...findOptions.where,
        id: MoreThan(cursor)
      }
    }

    tasks = await taskRepository.find(findOptions)

    return {
      tasks: tasks.slice(0, limit),
      hasNextPage: tasks.length > limit
    }
  }

  static async getTaskById(taskId: number, userId: number, isAdmin: boolean) {
    const taskRepository = DataSource.getRepository(Task)

    let task: Task | undefined

    task = await taskRepository.findOne({
      where: isAdmin ? { id: taskId } : { id: taskId, user: { id: userId } }
    })

    if (!task) throw new Error('Task not found')

    return task
  }

  static async updateTask(
    taskId: number,
    userId: number,
    title: string,
    description: string,
    status: TaskStatus,
    isAdmin: boolean
  ) {
    const taskRepository = DataSource.getRepository(Task)
    const task = await taskRepository.findOne({
      where: isAdmin ? { id: taskId } : { id: taskId, user: { id: userId } }
    })

    if (!task) throw new Error('Task not found')

    task.title = title
    task.description = description
    task.status = status

    await taskRepository.save(task)
    return task
  }

  static async deleteTask(taskId: number, userId: number, isAdmin: boolean) {
    const taskRepository = DataSource.getRepository(Task)
    const task = await taskRepository.findOne({
      where: isAdmin ? { id: taskId } : { id: taskId, user: { id: userId } }
    })

    if (!task) throw new Error('Task not found')

    await taskRepository.remove(task)
  }
}
