import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Subscription } from "./subscriptions.model";

@Table({tableName: 'user_subscriptions', createdAt: false, updatedAt: false})
export class UserSubscriptions extends Model<UserSubscriptions> {
    @ApiProperty({example: '1', description: "ID"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Subscription)
    @ApiProperty({example: '1', description: "SubscriptionID"})
    @Column({type: DataType.INTEGER})
    subscriptionId: number;

    @ApiProperty({example: '1', description: "UserID"})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
}