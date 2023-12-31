import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../../pkg/jwt'
import { AppConfig } from "../../pkg/config"
import { AuthenticatedRequest } from '../../pkg/express_request'
import { CustomError } from '../handler/response/custom_response'
// Extend the Request type to include the property


export interface AuthMiddlewareInterface {
    jwtMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> 
}

export class AuthMiddleware implements AuthMiddlewareInterface {

  private appConfig: AppConfig

  constructor(appConfig: AppConfig) {
    this.appConfig = appConfig
  }

    async jwtMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        // get token from header Authorization
        const token = req.header('Authorization')?.replace('Bearer ', '')
      
        if (!token) {
          throw new CustomError(401, 'Unauthorized')
        }
      
        try {
          // token verification
          const decoded = jwt.verify(token as string, this.appConfig.jwt.secretKey, { maxAge: this.appConfig.jwt.expired }) as JwtPayload
      
          req.id = decoded.id
          req.username = decoded.username
          req.email = decoded.email
          req.role = decoded.role
      
          next()

        } catch (error) {
          if (error instanceof jwt.TokenExpiredError) {
            next(new CustomError(401, 'Token expired. Please log in again.'))
          } else {
            next(error);
          }
        }
      }
}

