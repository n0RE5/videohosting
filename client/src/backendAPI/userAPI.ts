import { $authHost, $host } from "./index"
import { userDTO } from "../types/Dto"
import jwt_decode from "jwt-decode"
import { fetchedUser, IUser } from "../types/Interfaces"

export const registration = async (dto: userDTO): Promise<IUser> => {
    const response = await $host.post('auth/registration', dto)
    localStorage.setItem('token', response.data.token)
    return jwt_decode(response.data.token)
}

export const login = async (dto: userDTO): Promise<IUser> => {
    const response = await $host.post('auth/login', dto)
    localStorage.setItem('token', response.data.token)
    return jwt_decode(response.data.token)
}

export const check = async (): Promise<IUser> => {
    const response = await $authHost.get('auth/check')    
    localStorage.setItem('token', response.data)
    return jwt_decode(response.data)
}

export const getById = async (id: number): Promise<fetchedUser> => {
    const response = await $host.get(`/users/${id}`)
    return response.data
}