import { Module } from '@nestjs/common';
import { BansService } from './bans.service';
import { BansController } from './bans.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Bans } from './bans.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [BansService],
  controllers: [BansController],
  imports: [
    SequelizeModule.forFeature([Bans, User]),
    AuthModule
  ]
})
export class BansModule {}
