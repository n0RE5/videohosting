import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { BansModule } from './bans/bans.module';
import { Bans } from "./bans/bans.model";
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { VideoModule } from './video/video.module';
import { Video } from "./video/video.model";
import { Subscription } from "./subscriptions/subscriptions.model";
import { UserSubscriptions } from "./subscriptions/user-subscriptions.model";
import { LikesModule } from './likes/likes.module';
import { Like } from "./likes/likes.model";
import { FilesModule } from './files/files.module';
import * as path from "path";
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [User, Role, UserRoles, Bans, Video, Subscription, UserSubscriptions, Like],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        BansModule,
        SubscriptionsModule,
        VideoModule,
        LikesModule,
        FilesModule,
    ]
})

export class AppModule {

}