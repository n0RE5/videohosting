import { fetchedUser, IVideo } from "../types/Interfaces";

export const videoPlacehoder: IVideo = {
    id: 0,
    previewImg: "",
    video: "",
    title: "loading...",
    description: "loading...",
    views: 0,
    tags: "#loading...",
    userId: 0,
    likesCount: "0",
    createdAt: "27.07.2007",
}

export const fetchedUserPlacehoder: fetchedUser =  {
    id: 0,
    subscribersCount: "0",
    profileImg: "",
    username: ""
}