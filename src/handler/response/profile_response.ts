import { UserAttributes } from "../../repository/user_model"

interface ProfileResponse {
    id: string
    username: string
    email: string
    phone_number: string
    role: string
}

export default function NewProfileResponse(data: UserAttributes): ProfileResponse {

    const result: ProfileResponse = {
        id: data.id,
        username: data.username,
        email: data.email,
        phone_number: data.phone_number,
        role: data.role,
    }

    return result
}