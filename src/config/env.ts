import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3000
export const JWT_SECRET = process.env.JWT_SECRET
export const INVITE_EXPIRATION = process.env.INVITE_EXPIRATION
export const JWT_TOKEN_EXPIRATION = process.env.JWT_TOKEN_EXPIRATION
export const DATABASE_URL = process.env.DATABASE_URL
