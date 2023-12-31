import { Request, Response, NextFunction } from 'express' 
import { UserServiceInterface } from '../service/user_service' 
import { UserAttributes } from '../repository/user_model' 
import { CreateUserReq, LoginUserReq } from './request/user_request'
import { ApiResponse, CustomError } from './response/custom_response'
import { AuthenticatedRequest } from '../../pkg/express_request'

export interface UserHandlerInterface {
    createUser(req: Request, res: Response, next: NextFunction): Promise<void>
    getUserProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>
    updateUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>
    deleteUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>
    login(req: Request, res: Response, next: NextFunction): Promise<void>

}

export class UserHandler implements UserHandlerInterface {

  private userService: UserServiceInterface

  constructor(userService: UserServiceInterface) {

    this.userService = userService 

  }
  public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData: CreateUserReq = req.body 
      await this.userService.create(userData)
      
      const resp: ApiResponse = {
        success: true,
        message: 'User created successfully.'
      }
      res.status(201).send(resp) 

    } catch (error) {
      next(error)
    }
  }

  public async getUserProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
    
      const userProfile = await this.userService.getProfile(String(req.id));

      if (userProfile == null) {
        throw new CustomError(404, 'User not found.');
      }

      const resp: ApiResponse = {
        success: true,
        data: userProfile,
        message: 'Get Profile successfully.'
      };

      res.status(200).json(resp)

    } catch (error) {
      next(error)
    }
  }

  public async updateUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      
      const userData: Partial<UserAttributes> = req.body 

      await this.userService.update(String(req.id), userData) 

      const resp: ApiResponse = {
        success: true,
        message: 'User updated successfully.'
      }

      res.status(200).json(resp)

    } catch (error) {
      next(error)
    }
  }

  public async deleteUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
  
      await this.userService.delete(String(req.id)) 

      const resp: ApiResponse = {
        success: true,
        message: 'User deleted successfully.'
      }

      res.status(200).json(resp)

    } catch (error) {
      next(error) 
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData: LoginUserReq = req.body 
      const token = await this.userService.login(userData) 
    
      const resp: ApiResponse = {
        success: true,
        data: token,
        message: 'Login successfully.'
      }

      res.status(200).json(resp)

    } catch (error) {
      next(error)
    }
  }
 
}
