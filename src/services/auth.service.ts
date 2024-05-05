import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { User } from '../models/user.model'
import { INVITE_EXPIRATION } from '../config/env'
import { Invite } from '../models/invite.model'
import { DataSource } from '../config/database'
import { expireDuration } from '../utils/helpers'
import { AuthResponse, SignUpResponse } from '../types'

export class AuthService {
  static async signUp(
    email: string,
    password: string,
    inviteToken: string
  ): Promise<SignUpResponse> {
    const userRepository = DataSource.getRepository(User)

    // Validate invite
    const inviteRepository = DataSource.getRepository(Invite)
    const invite = await inviteRepository.findOne({
      where: { email: email, active: true }
    })

    if (
      !invite ||
      inviteToken !== invite.inviteToken ||
      new Date(invite.expiresAt) < new Date()
    ) {
      throw new Error('Invalid or expired invite')
    }

    const hashedPassword = await bcrypt.hash(password, 10) // hash password
    const newUser = userRepository.create({ email, password: hashedPassword })
    await userRepository.save(newUser)

    // Deactivate invite
    invite.active = false
    await inviteRepository.save(invite)

    return { email: newUser.email, id: newUser.id }
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    const userRepository = DataSource.getRepository(User)
    const user = await userRepository.findOne({ where: { email } })

    if (!user) throw new Error('User not found')

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) throw new Error('Invalid credentials')

    return { userId: user.id, role: user.role }
  }

  static async createInvite(adminId: number, email: string) {
    const inviteRepository = DataSource.getRepository(Invite)
    const userRepository = DataSource.getRepository(User)

    // Check if user exists
    const user = await userRepository.findOne({ where: { email } })
    if (user) throw new Error('User with this email already exists')

    // Generate invite token
    const inviteToken = uuidv4()
    const expiresAt = expireDuration(INVITE_EXPIRATION)

    let invite = await inviteRepository.findOne({ where: { email } })
    if (invite) {
      // Reset the expiration date for existing invite
      invite.expiresAt = expiresAt
      console.log(
        `Updated Invitation for user ${email} is: ${invite.inviteToken} and will expire at ${invite.expiresAt}`
      )
    } else {
      // Create new invite
      invite = inviteRepository.create({
        email,
        createdBy: { id: adminId },
        inviteToken,
        expiresAt
      })

      console.log(
        `New Invitation for user ${email} is: ${invite.inviteToken} and will expire at ${invite.expiresAt}`
      )
    }

    await inviteRepository.save(invite)

    return invite
  }
}
