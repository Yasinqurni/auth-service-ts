import { Sequelize, Options } from 'sequelize'
import { AppConfig } from './config'

export interface Database {
  connect(): Promise<Sequelize> 
}

export class DatabaseSequelize implements Database {

  private sequelize: Sequelize

  constructor(config: AppConfig) {
    const sequelizeOptions: Options = {
      host: config.database.host,
      port: Number(config.database.port),
      database: config.database.database,
      username: config.database.username,
      password: config.database.password,
      dialect: 'mysql',
      dialectOptions: {
        requestTimeout: 30000,
        options: {
          encrypt: true,
        },
      },
    }

    this.sequelize = new Sequelize(sequelizeOptions)
  }

  async connect(): Promise<Sequelize> {
    try {
      await this.sequelize.authenticate()
      console.log('Connection to the database has been established successfully.')
      return this.sequelize 
    } catch (error) {
      console.error('Unable to connect to the database:', error)
      throw error
    }
  }

  // Add other database-related methods as needed
  getSequelizeInstance(): Sequelize {
    return this.sequelize
  }
}


