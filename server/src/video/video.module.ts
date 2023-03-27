import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { User } from 'src/users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Video } from './video.model';
import { AuthModule } from 'src/auth/auth.module';
import { Like } from 'src/likes/likes.model';
import { FilesModule } from 'src/files/files.module';
import { LikesModule } from 'src/likes/likes.module';

@Module({
  providers: [VideoService],
  controllers: [VideoController],
  imports: [
    SequelizeModule.forFeature([User, Video, Like]),
    AuthModule,
    FilesModule,
  ],
})
export class VideoModule {}
