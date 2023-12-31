import express from 'express'
import { UserHandlerInterface } from './user_handler'
import { AuthMiddlewareInterface } from '../middleware/auth_middleware'


export class UserRouter {

  private userHandler: UserHandlerInterface
  private router: express.Router
  private authMiddleware: AuthMiddlewareInterface

  constructor(userHandler: UserHandlerInterface, router: express.Router, authMiddleware: AuthMiddlewareInterface) {
    this.userHandler = userHandler
    this.router = router
    this.authMiddleware = authMiddleware
    this.initializeRoutes()
  }

  public initializeRoutes(): void {
    this.router.post('/users', this.userHandler.createUser.bind(this.userHandler))
    this.router.get('/users', this.authMiddleware.jwtMiddleware.bind(this.authMiddleware), this.userHandler.getUserProfile.bind(this.userHandler))
    this.router.put('/users', this.authMiddleware.jwtMiddleware.bind(this.authMiddleware), this.userHandler.updateUser.bind(this.userHandler))
    this.router.delete('/users', this.authMiddleware.jwtMiddleware.bind(this.authMiddleware), this.userHandler.deleteUser.bind(this.userHandler))
    this.router.post('/login', this.userHandler.login.bind(this.userHandler))
  }

  public getRouter(): express.Router {
    return this.router
  }
}
