import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface BansCreationAttrs {
    reason: string;
    userId: number;
}

@Table({tableName: 'bans'})
export class Bans extends Model<Bans, BansCreationAttrs> {
    @ApiProperty({example: '1', description: "ID"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Cheating', description: "Ban Reason"})
    @Column({type: DataType.STRING, allowNull: false})
    reason: string;

    @ApiProperty({example: '1', description: "User Id"})
    @ForeignKey(() => User)
    userId: number;
}