import { useEffect, useState } from "react"
import { checkSubscription, subscribeToUser, unsubscribeFromUser } from "../backendAPI/subscribtionsAPI"
import { useFetching } from "./useFetching"

export const useSubscriptions = (userId?: number) => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false)

    const checkSubscribe = async () => {
        if(!userId) return
        const response = await checkSubscription({userId})
        setIsSubscribed(response)
    }

    const [subscribe, subscribeFetching] = useFetching(async () => {
        if(!userId) return
        const response = await subscribeToUser({userId})
        console.log(response);
        
    })

    const [unsubscribe, unsubscribeFetching] = useFetching(async () => {
        if(!userId) return
        const response = await unsubscribeFromUser({userId})
        console.log(response);

    })

    useEffect(() => {
        checkSubscribe()
    }, [subscribeFetching, unsubscribeFetching, userId])

    return [isSubscribed, subscribe, unsubscribe] as const
}