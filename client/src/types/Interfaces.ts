export interface IUser {
    id: number,
    username: string,
    email: string,
    roles: string,
    profileImg: string
}

export interface fetchedUser {
    id: number,
    subscribersCount: string,
    profileImg: string,
    username: string
}

export interface IVideo {
    id: number;
    previewImg: string;
    video: string;
    title: string;
    description: string;
    views: number;
    tags: string;
    userId: number;
    likesCount: string;
    createdAt: string;
}