export interface DecodedToken {
  userId: string
}

export interface AuthResponse {
  userId: number
  role: 'admin' | 'user'
}

export interface SignUpResponse {
  email: string
  id: number
}
