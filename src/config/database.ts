import { DataSource as ORMDataSource } from 'typeorm'

import { DATABASE_URL } from './env'

export const DataSource = new ORMDataSource({
  type: 'postgres',
  url: DATABASE_URL,
  entities: [__dirname + '/../models/*.ts'],
  migrations: [__dirname + '/../migrations/*.ts'],
  synchronize: true
})
