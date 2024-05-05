import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import { User } from './user.model'

@Entity()
export class Invite {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column({ default: true })
  active: boolean

  @Column()
  inviteToken: string

  @ManyToOne(() => User)
  createdBy: User

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  expiresAt: Date
}
