import express from 'express'
import { json } from 'body-parser'
import cors from 'cors'

import { DataSource } from './config/database'
import { PORT } from './config/env'
import authRoutes from './routes/auth.routes'
import taskRoutes from './routes/task.routes'
import userRoutes from './routes/user.routes'
import inviteRoutes from './routes/invite.routes'
import { errorHandler } from './utils/error-handler'
import { setupSwagger } from './config/swagger'

const app = express()
app.use(json())
app.use(cors())

app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)
app.use('/users', userRoutes)
app.use('/invites', inviteRoutes)

setupSwagger(app)
app.use(errorHandler)

DataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
