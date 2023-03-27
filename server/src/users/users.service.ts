import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/roles.model';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { Subscription } from 'src/subscriptions/subscriptions.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService, @InjectModel(Subscription) private subscriptionRepository: typeof Subscription) {}

    async createUser(dto: CreateUserDto) {
         const user = await this.userRepository.create(dto)
         const createSubscriptionList = await this.subscriptionRepository.create({userId: user.id})
         const role = await this.roleService.getRoleOrCreate("USER")
         await user.$set('roles', [role.id])
         user.roles = [role]
         return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAndCountAll({include: {all: true}})
        return users
    }

    async getUser(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }
}
