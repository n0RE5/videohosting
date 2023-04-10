import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/roles.model';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { Subscription } from 'src/subscriptions/subscriptions.model';
import { Sequelize } from 'sequelize';
import { UserSubscriptions } from 'src/subscriptions/user-subscriptions.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService, @InjectModel(Subscription) private subscriptionRepository: typeof Subscription, private fileService: FilesService) {}

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

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({
            where: {id},
            attributes: [
                'id', 'profileImg', 'username', [Sequelize.fn('COUNT', Sequelize.col(`user_subscriptions.id`)), `subscribersCount`]
            ],
            include: {
                model: UserSubscriptions,
                attributes: []
            },
            group: ['User.id']
        })
        return user
    }

    async editUser(files: any, req: any) {
        const user = await this.userRepository.findOne({where: {id: req.user.id}})
        const profileImg = await this.fileService.createFile(files[0], '.jpg')
        await user.update({profileImg})
        return user
    }
}
