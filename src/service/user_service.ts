import { v4 as uuidv4 } from 'uuid'
import { UserAttributes, RoleEnum } from '../repository/user_model'
import { UserRepositoryInterface } from '../repository/user_repository'
import { CreateUserReq, LoginUserReq } from '../handler/request/user_request'
import { hashPassword, comparePassword } from '../../pkg/bcrypt'
import { generateToken } from '../../pkg/jwt'
import { AppConfig } from "../../pkg/config"
import { JwtPayload } from '../../pkg/jwt'

export interface UserServiceInterface {
    create(data: CreateUserReq): Promise<void>
    getProfile(id: number): Promise<UserAttributes | null>
    update(id: number, data: Partial<UserAttributes>): Promise<void>
    delete(id: number): Promise<void>
    login(data: LoginUserReq): Promise<string>
  }

export class UserService implements UserServiceInterface {
    private userRepository: UserRepositoryInterface
    private tokenJwt: typeof generateToken
    private appConfig: AppConfig

    constructor(userRepository: UserRepositoryInterface, tokenJwt: typeof generateToken, appConfig: AppConfig) {  
        this.userRepository = userRepository
        this.tokenJwt = tokenJwt
        this.appConfig = appConfig
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

    async login(data: LoginUserReq): Promise<string> {

        const user = await this.userRepository.getByEmail(data.email)
        if (user == null) {
            throw new Error('User not found')
          }

        const validPassword = comparePassword(data.password, String(user?.password))
        if (!validPassword) {
            throw new Error('Invalid password')
          }

        const payload: JwtPayload = {
            id: String(user?.id),
            email: String(user?.email),
            role: String(user?.role),

        }

        return generateToken(payload, this.appConfig.jwt.secretKey, this.appConfig.jwt.expired)
    }
}