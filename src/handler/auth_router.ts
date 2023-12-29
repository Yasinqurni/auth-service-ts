import express from 'express'
import { UserHandlerInterface } from './auth_handler'


export class UserRouter {

  private userHandler: UserHandlerInterface
  private router: express.Router

  constructor(userHandler: UserHandlerInterface, router: express.Router) {
    this.userHandler = userHandler
    this.router = router

    this.initializeRoutes()
  }

  public initializeRoutes(): void {
    this.router.post('/users', this.userHandler.createUser.bind(this.userHandler))
    this.router.get('/users', this.userHandler.getUserProfile.bind(this.userHandler))
    this.router.put('/users/:id', this.userHandler.updateUser.bind(this.userHandler))
    this.router.delete('/users/:id', this.userHandler.deleteUser.bind(this.userHandler))
  }

  public getRouter(): express.Router {
    return this.router
  }
}
