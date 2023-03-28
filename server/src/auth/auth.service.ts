import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs";
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUser(userDto.email)
        
        if(candidate) {
            throw new HttpException("User with this email already exists", HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    async changePassword(dto: {userDto: CreateUserDto, newPassword: string}) {
        const user = await this.validateUser(dto.userDto)
        const hashNewPassword = await bcrypt.hash(dto.newPassword, 5)
        const passwordCompare = await bcrypt.compare(user.password, hashNewPassword)
        if(passwordCompare) {
            throw new HttpException("You must use different password!", HttpStatus.BAD_REQUEST)
        }
        const passwordUpdate = await user.update({password: hashNewPassword},{where: {email: dto.userDto.email}})
        return true;
    }

    async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, username: user.username, roles: user.roles, profileImg: user.profileImg}
        return {
            token: this.jwtService.sign(payload) 
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUser(userDto.email)
        const passwordHash = await bcrypt.compare(userDto.password, user.password)

        if (user && passwordHash) {
            return user;
        }

        throw new UnauthorizedException({message: "Invalid username or password"})
    }
}
