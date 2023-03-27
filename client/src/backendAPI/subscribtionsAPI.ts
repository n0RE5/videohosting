import { $authHost } from "./index"
import { CreateSubscriptionDto } from "../types/Dto"

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