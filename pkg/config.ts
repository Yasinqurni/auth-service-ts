import * as dotenv from 'dotenv'

export interface AppConfig {
    database: DatabaseConfig
    app: AppSettings
    jwt: Jwt
}

export interface DatabaseConfig {
    username: string
    password: string
    database: string
    host: string
    dialect: string
    port: string
}

export interface AppSettings {
    port: string
}

interface Jwt {
    secretKey: string
    expired: string
}

export interface Config {
    loadConfig(): AppConfig
}

export class ConfigLoader implements Config {

    loadConfig(): AppConfig {
        dotenv.config()

        const config: AppConfig = {
            database: {
                username: String(process.env.DB_USER),
                password: String(process.env.DB_PASS),
                database: String(process.env.DB_NAME),
                host: String(process.env.DB_HOST),
                dialect: String(process.env.DB_DIALECT),
                port: String(process.env.DB_PORT)
            },
            app: {
                port: String(process.env.PORT)
            },
            jwt: {
                secretKey: String(process.env.JWT_SECRETKEY),
                expired: String(process.env.JWT_EXPIRED)
            }
        }

        return config
    }
}

