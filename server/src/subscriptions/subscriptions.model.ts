import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserSubscriptions } from "./user-subscriptions.model";

interface SubscriptionCreationAttrs {
    userId: number;
    subscriptionId: number;
}

@Table({tableName: 'subscriptions'})
export class Subscription extends Model<Subscription, SubscriptionCreationAttrs> {
    @ApiProperty({example: '1', description: "ID"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    userId: number

    @HasMany(() => UserSubscriptions)
    userSubscriptions: UserSubscriptions[]
}