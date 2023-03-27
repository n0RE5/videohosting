import { Body, Controller, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './auth-guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @UseGuards(AuthGuard)
    @Post('/changepassword')
    changepassword(@Body() dto: {userDto: CreateUserDto, newPassword: string}) {
        return this.authService.changePassword(dto)
    }
}
