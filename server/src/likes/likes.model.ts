import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Video } from "src/video/video.model";
import { User } from "src/users/users.model";

interface LikeCreationAttrs {
    userId: number;
    videoId: number;
}

@Table({tableName: 'likes'})
export class Like extends Model<Like, LikeCreationAttrs> {
    @ApiProperty({example: '1', description: "ID"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    userId: number

    @ForeignKey(() => Video)
    videoId: number
}