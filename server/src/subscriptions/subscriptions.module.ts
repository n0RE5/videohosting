import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { SubscriptionsController } from './subscriptions.controller';
import { Subscription } from './subscriptions.model';
import { SubscriptionsService } from './subscriptions.service';
import { UserSubscriptions } from './user-subscriptions.model';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  imports: [
    SequelizeModule.forFeature([User, Subscription, UserSubscriptions]),
    AuthModule
  ],
  exports: [
    SubscriptionsService
  ]
})
export class SubscriptionsModule {}
