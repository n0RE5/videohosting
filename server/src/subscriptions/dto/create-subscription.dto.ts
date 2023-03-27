import { ApiProperty } from "@nestjs/swagger";

export class CreateSubscriptionDto {
    @ApiProperty({example: '2', description: "Id of user who is subscribing"})
    readonly subscriptionId: number;

    @ApiProperty({example: '1', description: "Refer to a channel (userId)"})
    readonly userId: number;
}