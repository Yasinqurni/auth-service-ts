import { UserAttributes } from '../repository/auth_model'
import { UserRepositoryInterface } from '../repository/auth_repository'

export interface UserServiceInterface {
    create(data: UserAttributes): Promise<void>
    getProfile(id: number): Promise<UserAttributes | null>
    update(id: number, data: Partial<UserAttributes>): Promise<void>
    delete(id: number): Promise<void>
  }

export class UserService implements UserServiceInterface {

    constructor(private userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository
    }

    async create(data: UserAttributes): Promise<void> {

        return await this.userRepository.create(data)

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