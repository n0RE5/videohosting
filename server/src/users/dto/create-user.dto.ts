import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail } from "class-validator"

export class CreateUserDto {
    @ApiProperty({example: 'Admin', description: "Username"})
    readonly username: string;

    @ApiProperty({example: 'user@mail.com', description: "Email"})
    @IsString({message: "Have to be a string"})
    @IsEmail({},{message: "Invalid email"})
    readonly email: string;
    
    @ApiProperty({example: '1t7bftadf7bad', description: "Hashed Password"})
    @IsString({message: "Have to be a string"})
    @Length(5, 100, {message: "Password must have at least 5 characters"})
    readonly password: string;

    @ApiProperty({example: 'img.png', description: "Profile Img link"})
    readonly profileImg?: string;
}