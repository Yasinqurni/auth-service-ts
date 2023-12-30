import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../../pkg/jwt'
// Extend the Request type to include the property
interface AuthenticatedRequest extends Request {
  id?: string
  username?: string
  email?: string
  role?: string
}

export interface AuthMiddlewareInterface {
    jwtMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> 
}

export class AuthMiddleware implements AuthMiddlewareInterface {

  private secretKey: string

  constructor(secretKey: string) {
    this.secretKey = secretKey
  }

    async jwtMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        // get token from header Authorization
        const token = req.header('Authorization')?.replace('Bearer ', '')
      
        if (!token) {
          res.status(401).json({ error: 'Unauthorized' })
        }
      
        try {
          // token verification
          const decoded = jwt.verify(token as string, this.secretKey) as JwtPayload
      
          req.id = decoded.id
          req.username = decoded.username
          req.email = decoded.email
          req.role = decoded.role
      
          next()

        } catch (error) {
          res.status(401).json({ error: 'Unauthorized' })
        }
      }
}

