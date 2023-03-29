import { $authHost, $host } from "./index"

interface likeCreation {
    id: number
    videoId: number
    userId: number
}

export const likeVideo = async (videoId: number): Promise<likeCreation> => {
    const response = await $authHost.post('likes', {videoId})
    return response.data
}

export const checkIsLiked = async (videoId: number): Promise<boolean> => {
    const response = await $authHost.post('likes/check', {videoId})
    return response.data
}