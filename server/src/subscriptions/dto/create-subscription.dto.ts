import { ApiProperty } from "@nestjs/swagger";

export class CreateSubscriptionDto {
    @ApiProperty({example: '1', description: "Refer to a channel (userId)"})
    readonly userId: number;
}