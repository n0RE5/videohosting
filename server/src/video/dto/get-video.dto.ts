import { ApiProperty } from "@nestjs/swagger";

export class VideoDto {
    @ApiProperty({example: '1', description: "Limit"})
    readonly limit: number;

    @ApiProperty({example: '1', description: "Page"})
    readonly page: number;
}

export class GetUsersVideoDto extends VideoDto {
    @ApiProperty({example: '1', description: "Video Id"})
    readonly userId: number;
}

export class SearchVideoDto extends VideoDto {
    @ApiProperty({example: 'Minecraft', description: "SearchQuery"})
    readonly searchQuery: string;
}