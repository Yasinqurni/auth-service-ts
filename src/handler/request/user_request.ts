
export interface CreateUserReq {
    username: string
    email: string
    phone_number: string
    password: string
}

export interface LoginUserReq {
    email: string
    password: string
}