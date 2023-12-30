import { Request, Response } from 'express' 
import { UserServiceInterface } from '../service/auth_service' 
import { UserAttributes } from '../repository/auth_model' 
import CreateUserReq from './request/create_user'

export interface UserHandlerInterface {
    createUser(req: Request, res: Response): Promise<void>
    getUserProfile(req: Request, res: Response): Promise<void>
    updateUser(req: Request, res: Response): Promise<void>
    deleteUser(req: Request, res: Response): Promise<void>

}

export class UserHandler implements UserHandlerInterface {

  private userService: UserServiceInterface

  constructor(userService: UserServiceInterface) {

    this.userService = userService 

  }
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: CreateUserReq = req.body 
      await this.userService.create(userData) 
      res.status(201).send('User created successfully.') 
    } catch (error) {
      console.error('Error creating user:', error) 
      res.status(500).send('Internal Server Error') 
    }
  }

  public async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = parseInt(req.params.id, 10) 
      const userProfile = await this.userService.getProfile(userId) 
      if (userProfile) {
        res.status(200).json(userProfile) 
      } else {
        res.status(404).send('User not found.') 
      }
    } catch (error) {
      console.error('Error getting user profile:', error) 
      res.status(500).send('Internal Server Error') 
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = parseInt(req.params.id, 10) 
      const userData: Partial<UserAttributes> = req.body 
      await this.userService.update(userId, userData) 
      res.status(200).send('User updated successfully.') 
    } catch (error) {
      console.error('Error updating user:', error) 
      res.status(500).send('Internal Server Error') 
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = parseInt(req.params.id, 10) 
      await this.userService.delete(userId) 
      res.status(200).send('User deleted successfully.') 
    } catch (error) {
      console.error('Error deleting user:', error) 
      res.status(500).send('Internal Server Error') 
    }
  }

}
