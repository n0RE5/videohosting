import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UserSubscriptions } from './user-subscriptions.model';

@Injectable()
export class SubscriptionsService {

    constructor(@InjectModel(UserSubscriptions) private subscriptionRepository: typeof UserSubscriptions) {}

    async subscribe(dto: CreateSubscriptionDto) {
        const candidate = await this.subscriptionRepository.findOne({where: {userId: dto.userId, subscriptionId: dto.subscriptionId}})
        if (candidate) {
            throw new HttpException("You already subscribed to this user", HttpStatus.BAD_REQUEST)
        }
        const subscribe = await this.subscriptionRepository.create(dto)
        return subscribe
    }

    async unsubscribe(dto: CreateSubscriptionDto) {
        const candidate = await this.subscriptionRepository.findOne({where: {userId: dto.userId, subscriptionId: dto.subscriptionId}})
        if (!candidate) {
            throw new HttpException("You aren't subscribed to this user", HttpStatus.BAD_REQUEST)
        }
        const unsubscribe = await this.subscriptionRepository.destroy({where: {userId: dto.userId, subscriptionId: dto.subscriptionId}})
        return unsubscribe
    }

    async isSubscribed(dto: CreateSubscriptionDto) {
        const candidate = await this.subscriptionRepository.findOne({where: {userId: dto.userId, subscriptionId: dto.subscriptionId}})
        if (!candidate) {
            return false
        }
        return true
    }
}
