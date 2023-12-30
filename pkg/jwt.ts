import jwt from 'jsonwebtoken'

export interface JwtPayload {
    id: string
    username?: string
    email: string
    role: string
  }


export function generateToken(payload: JwtPayload, secretKey: string, expired: string): string {

  return jwt.sign(payload, secretKey, { expiresIn: expired })

}

