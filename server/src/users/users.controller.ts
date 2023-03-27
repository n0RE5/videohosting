import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger/dist';
import { AuthGuard } from 'src/auth/auth-guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @ApiOperation({summary: "Get All Users"})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN")
    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: "Get Users"})
    @ApiResponse({status: 200, type: [User]})
    @Get('/:email')
    get(@Param('email') email: string) {
        return this.userService.getUser(email)
    }
}
