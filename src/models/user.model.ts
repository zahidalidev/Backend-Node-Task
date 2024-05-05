import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

import { Task } from './task.model'
import { Invite } from './invite.model'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[]

  @OneToMany(() => Invite, (invite) => invite.createdBy)
  invites: Invite[]

  @Column({ nullable: true })
  inviteToken: string

  @Column({ default: 'user' })
  role: 'admin' | 'user'
}
