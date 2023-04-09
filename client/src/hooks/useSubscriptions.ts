import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { checkSubscription, subscribeToUser, unsubscribeFromUser } from "../backendAPI/subscribtionsAPI"
import { AUTH_PATH } from "../utils/Consts"
import { useFetching } from "./useFetching"
import { useAppSelector } from "./useReduxHooks"

export const useSubscriptions = (userId: number) => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
    const isAuth = useAppSelector(state => state.userSlice.isAuth)
    const navigate = useNavigate()

    const [subscribe, subscribeFetching] = useFetching(async () => {
        if(subscribeFetching) return
        if(!isAuth) return navigate(AUTH_PATH)

        if (isSubscribed) {
            const response = await unsubscribeFromUser({userId})
        } else {
            const response = await subscribeToUser({userId})
        }
    })

    const checkSubscribe = useMemo(async () => {
        const response = await checkSubscription({userId})
        setIsSubscribed(response)
    }, [subscribeFetching, userId])

    return [isSubscribed, subscribe] as const
}