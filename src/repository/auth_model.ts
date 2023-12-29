import { DataTypes, Model, Sequelize } from 'sequelize'

interface UserAttributes {
  id: number
  username: string
  email: string
  phone_number: string
  password: string
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number
  public username!: string
  public email!: string
  public phone_number!: string
  public password!: string

  public readonly created_at!: Date
  public readonly updated_at!: Date
}

// Sequelize model configuration
const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: sequelize,
      tableName: 'users',
      deletedAt: 'deleted_at',
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    }
  )
  return User
}

export { UserAttributes, User, initUserModel }
