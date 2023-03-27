import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Like } from './likes.model';
import { Video } from 'src/video/video.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [LikesService],
  controllers: [LikesController],
  imports: [
    SequelizeModule.forFeature([User, Video, Like]),
    AuthModule
  ],
  exports: [
    LikesService
  ]
})
export class LikesModule {}
