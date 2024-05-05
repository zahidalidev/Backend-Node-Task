import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique
} from 'typeorm'

import { User } from './user.model'

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

@Entity()
@Unique(['title'])
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING
  })
  status: TaskStatus

  @ManyToOne(() => User, (user) => user.tasks)
  user: User
}
