import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Bans } from "src/bans/bans.model";
import { UserRoles } from "src/roles/user-roles.model";
import { Role } from "src/roles/roles.model";
import { Video } from "src/video/video.model";
import { Subscription } from "src/subscriptions/subscriptions.model";
import { Like } from "src/likes/likes.model";

interface UserCreationAttrs {
    username: string;
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: "ID"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'USER', description: "Username"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    username: string;

    @ApiProperty({example: 'user@mail.com', description: "Email"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '1t7bftadf7bad', description: "Hashed Password"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasOne(() => Subscription)
    subscriptions: Subscription

    @HasMany(() => Video)
    video: Video[]

    @HasMany(() => Like)
    likes: Like[]
}