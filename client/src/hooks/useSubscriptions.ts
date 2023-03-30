import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { checkSubscription, subscribeToUser, unsubscribeFromUser } from "../backendAPI/subscribtionsAPI"
import { AUTH_PATH } from "../utils/Consts"
import { useFetching } from "./useFetching"
import { useAppSelector } from "./useReduxHooks"

export const useSubscriptions = (userId?: number) => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
    const isAuth = useAppSelector(state => state.userSlice.isAuth)
    const navigate = useNavigate()

    const checkSubscribe = async () => {
        if(!userId) return
        const response = await checkSubscription({userId})
        setIsSubscribed(response)
    }

    const [subscribe, subscribeFetching] = useFetching(async () => {
        if(!userId) return
        if(!isAuth) return navigate(AUTH_PATH)
        const response = await subscribeToUser({userId})
    })

    const [unsubscribe, unsubscribeFetching] = useFetching(async () => {
        if(!userId) return
        if(!isAuth) return navigate(AUTH_PATH)
        const response = await unsubscribeFromUser({userId})
    })

    useEffect(() => {
        checkSubscribe()
    }, [subscribeFetching, unsubscribeFetching, userId])

    return [isSubscribed, subscribe, unsubscribe] as const
}