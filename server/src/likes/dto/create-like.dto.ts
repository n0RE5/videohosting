import { ApiProperty } from "@nestjs/swagger";

export class CreateLikeDto {
    @ApiProperty({example: '1', description: "User ID"})
    readonly userId: number;

    @ApiProperty({example: '1', description: "VIDEO ID"})
    readonly videoId: number;
}