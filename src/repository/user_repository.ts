import { User, UserAttributes } from './user_model'

export interface UserRepositoryInterface {
  create(data: UserAttributes): Promise<void>
  getProfile(id: number): Promise<UserAttributes | null>
  update(id: number, data: Partial<UserAttributes>): Promise<void>
  delete(id: number): Promise<void>
  getByEmail(email: string): Promise<UserAttributes | null>
}

export class UserRepository implements UserRepositoryInterface {

  constructor(private userModel: typeof User) {
    this.userModel = userModel
  }

  async create(data: UserAttributes): Promise<void> {

      await this.userModel.create(data)
   
  }

  async getProfile(id: number): Promise<UserAttributes | null> {

    const user = await this.userModel.findByPk(id)

    if (user) {

      return user

    } else {

      return null
      
    }
  }

  async update(id: number, data: Partial<UserAttributes>): Promise<void> {

    const user = await this.userModel.findByPk(id)
    if (user) {
      await user.update(data)
    }
  }

  async delete(id: number): Promise<void> {

    const user = await this.userModel.findByPk(id)
    if (user) {
      await user.destroy()
    }
  }

  async getByEmail(email: string): Promise<UserAttributes | null> {
    const user = await this.userModel.findOne({ where: { email } })

    if (user) {

      return user

    } else {

      return null

    }
  }

}
