import { MigrationInterface, QueryRunner } from 'typeorm'
import bcrypt from 'bcrypt'

import { User } from '../models/user.model'

export class SeedAdmin1714769401268 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User)
    const existingAdmin = await userRepository.findOne({
      where: { email: 'admin@gmail.com' }
    })

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin', 10)
      const admin = userRepository.create({
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin'
      })
      await userRepository.save(admin)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User)
    const existingAdmin = await userRepository.findOne({
      where: { email: 'admin@gmail.com' }
    })

    if (existingAdmin) await userRepository.remove(existingAdmin)
  }
}
