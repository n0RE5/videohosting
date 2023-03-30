export interface userDTO {
    readonly username: string
    readonly email: string
    readonly password: string
}

export interface CreateVideoDto {
    readonly title: string;
    readonly description: string;
    readonly tags: string;
    readonly previewImg: string;
    readonly video: string;
}

export interface CreateSubscriptionDto {
    readonly userId: number;
}

export interface VideoDto {
    readonly limit: number;
    readonly page: number;
}

export interface GetUsersVideoDto extends VideoDto {
    readonly userId: number;
}

export interface SearchVideoDto extends VideoDto {
    readonly searchQuery: string;
}