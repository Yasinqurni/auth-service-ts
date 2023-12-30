import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  id: string
  username?: string
  email: string
  phone_number: string
}

// Extend the Request type to include the property
interface AuthenticatedRequest extends Request {
  id?: string
  username?: string
  email?: string
  phone_number?: string
}

export interface AuthMiddlewareInterface {
    jwtMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> 
}

export class AuthMiddleware implements AuthMiddlewareInterface {

    async jwtMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        // get token from header Authorization
        const token = req.header('Authorization')?.replace('Bearer ', '')
      
        if (!token) {
          res.status(401).json({ error: 'Unauthorized' })
        }
      
        try {
          // token verification
          const decoded = jwt.verify(token as string, 'your_secret_key') as JwtPayload
      
          req.id = decoded.id
          req.username = decoded.username
          req.email = decoded.email
          req.phone_number = decoded.phone_number
      
          next()
        } catch (error) {
          res.status(401).json({ error: 'Unauthorized' })
        }
      }
}

