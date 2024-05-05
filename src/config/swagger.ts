import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'

import { PORT } from './env'

export const setupSwagger = (app: Express) => {
  const options = {
    swaggerDefinition: {
      explorer: true,
      openapi: '3.1.0',
      info: {
        title: 'Task API Documentation',
        version: '1.0.0',
        description: 'API Documentation for Auth, Invite and Task features'
      },
      authAction: {
        JWT: {
          name: 'JWT',
          schema: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: ''
          },
          value: 'Bearer <my own JWT token>'
        }
      },
      servers: [
        {
          url: `http://localhost:${PORT}`
        }
      ]
    },
    apis: ['src/routes/*.ts']
  }

  const specs = swaggerJsdoc(options)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}
