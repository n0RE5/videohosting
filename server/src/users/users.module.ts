import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Bans } from 'src/bans/bans.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { Role } from 'src/roles/roles.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';
import { Video } from 'src/video/video.model';
import { Subscription } from 'src/subscriptions/subscriptions.model';
import { Like } from 'src/likes/likes.model';
import { UserSubscriptions } from 'src/subscriptions/user-subscriptions.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Bans, Video, Subscription, Like, UserSubscriptions]),
    RolesModule,
    FilesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
