import { $authHost } from "./index"
import { CreateSubscriptionDto } from "../types/Dto"
import { getById } from "./userAPI"
import { fetchedUser } from "../types/Interfaces"

interface user_subs {
    id: number,
    userId: number
    subscriptionId: number
}

export const subscribeToUser = async (dto: CreateSubscriptionDto): Promise<CreateSubscriptionDto> => {
    const response = await $authHost.post('subscriptions/subscribe', dto)
    return response.data
}

export const unsubscribeFromUser = async (dto: CreateSubscriptionDto): Promise<CreateSubscriptionDto> => {
    const response = await $authHost.post('subscriptions/unsubscribe', dto)
    return response.data
}

export const checkSubscription = async (dto: CreateSubscriptionDto): Promise<boolean> => {
    const response = await $authHost.post('subscriptions/check', dto)
    return response.data
}

const getUserArray = async (res: user_subs[]) => {
    const users = []
    for (let element of res) {
        const user = await getById(element.userId)
        users.push(user)
    }
    return users
}

export const getUserSubs = async(): Promise<fetchedUser[]> => {
    const response = await $authHost.get('subscriptions')
    const users = await getUserArray(response.data)
    return users
}