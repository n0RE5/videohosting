import { $authHost, $host } from "./index";
import { CreateVideoDto, GetUsersVideoDto, SearchVideoDto, VideoDto } from "../types/Dto";
import { IVideo } from "../types/Interfaces";

interface countedVideos {
    count: {
        length: number
    }
    rows: IVideo[]
}

export const createVideo = async (dto: CreateVideoDto) => {
    const response = await $authHost.post('video', dto)
    return response
}

export const getVideo = async (videoId: number): Promise<IVideo> => {
    const response = await $host.get(`video/${videoId}`)    
    return response.data
}

export const getVideosFromUser = async (dto: GetUsersVideoDto): Promise<countedVideos> => {
    const response = await $host.post(`video/user`, dto)
    return response.data
}

export const searchVideos = async (dto: SearchVideoDto) => {
    const response = await $host.post(`video/search`, dto)
    return response.data
}

export const getVideos = async (dto: VideoDto): Promise<IVideo[]> => {
    const response = await $host.post(`video/videos`, dto)
    return response.data

}
