import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { checkIsLiked, likeVideo } from "../backendAPI/likeAPI"
import { AUTH_PATH } from "../utils/Consts"
import { useFetching } from "./useFetching"
import { useAppSelector } from "./useReduxHooks"

export const useLikes = (videoId?: number) => {
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const isAuth = useAppSelector(state => state.userSlice.isAuth)
    const navigate = useNavigate()

    const checkLike = async () => {
        if(!videoId) return
        const response = await checkIsLiked(videoId)
        setIsLiked(response)
    }

    const [like, likeFetching] = useFetching(async () => {
        if(!videoId) return
        if(!isAuth) return navigate(AUTH_PATH)
        const response = await likeVideo(videoId)
    })

    useEffect(() => {
        checkLike()
    }, [likeFetching, videoId])

    return [isLiked, like] as const
}