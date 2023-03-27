import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example: 'ADMIN', description: "Role Name"})
    readonly value: string;
    @ApiProperty({example: 'Grants god powers', description: "Role Description"})
    readonly description: string;
}