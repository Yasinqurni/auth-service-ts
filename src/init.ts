import { initUserModel } from "./repository/auth_model";
import { UserRepository } from "./repository/auth_repository";
import { UserService } from "./service/auth_service";
import { UserHandler } from "./handler/auth_handler";
import { UserRouter } from "./handler/auth_router";
import { Sequelize } from 'sequelize';
import express from 'express';

export default function Init(sequelize: Sequelize, router: express.Router): express.Router {
    const userRepository =  new UserRepository(initUserModel(sequelize))
    const userService = new UserService(userRepository)
    const userHandler = new UserHandler(userService)
    const userRouter = new UserRouter(userHandler, router)
    
    userRouter.initializeRoutes()
    
    return userRouter.getRouter()

}