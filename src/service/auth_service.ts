import { v4 as uuidv4 } from 'uuid';
import { UserAttributes, RoleEnum } from '../repository/auth_model'
import { UserRepositoryInterface } from '../repository/auth_repository'
import CreateUserReq from '../handler/request/create_user';
import { hashPassword } from '../../pkg/bcrypt';

export interface UserServiceInterface {
    create(data: CreateUserReq): Promise<void>
    getProfile(id: number): Promise<UserAttributes | null>
    update(id: number, data: Partial<UserAttributes>): Promise<void>
    delete(id: number): Promise<void>
  }

export class UserService implements UserServiceInterface {

    constructor(private userRepository: UserRepositoryInterface) {  
        this.userRepository = userRepository
    }

    async create(data: CreateUserReq): Promise<void> {

        const user: UserAttributes = {
            id: uuidv4(),
            username: data.username,
            email: data.email,
            phone_number: data.phone_number,
            password: await hashPassword(data.password),
            role: RoleEnum.User
        }
        return await this.userRepository.create(user)

    }

    async getProfile(id: number): Promise<UserAttributes | null> {

        return await this.userRepository.getProfile(id)

    }

    async  update(id: number, data: Partial<UserAttributes>): Promise<void> {

        return await this.userRepository.update(id, data) 

    }

    async delete(id: number): Promise<void> {

        return await this.userRepository.delete(id)

    }
}