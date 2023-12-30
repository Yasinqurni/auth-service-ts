import { initUserModel } from "./repository/user_model";
import { UserRepository } from "./repository/user_repository";
import { UserService } from "./service/user_service";
import { UserHandler } from "./handler/user_handler";
import { UserRouter } from "./handler/user_router";
import { AuthMiddleware } from "./middleware/auth_middleware";
import { AppConfig } from "../pkg/config";
import { generateToken } from '../pkg/jwt'
import { Sequelize } from 'sequelize';
import express from 'express';

export default function Init(sequelize: Sequelize, router: express.Router, appConfig: AppConfig): express.Router {
    const userRepository =  new UserRepository(initUserModel(sequelize))
    const userService = new UserService(userRepository, generateToken, appConfig)
    const userHandler = new UserHandler(userService)
    const authMiddleware = new AuthMiddleware(appConfig)
    const userRouter = new UserRouter(userHandler, router, authMiddleware)
    
    userRouter.initializeRoutes()
    
    return userRouter.getRouter()

}