import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Like } from "src/likes/likes.model";
import { User } from "src/users/users.model";

interface VideoCreationAttrs {
    previewImg: string;
    video: string;
    title: string;
    description: string;
    tags: string;
    userId: number;
}

@Table({tableName: 'videos'})
export class Video extends Model<Video, VideoCreationAttrs> {
    @ApiProperty({example: '1', description: "ID"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '123.jpg', description: "Preview Image Name"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    previewImg: string;

    @ApiProperty({example: '123.mp4', description: "Video Name"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    video: string;

    @ApiProperty({example: 'My Video', description: "Video Title"})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: 'my first video', description: "Video Description"})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @ApiProperty({example: '0', description: "Video Views Count"})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    views: number;
    
    @ApiProperty({example: '#nest #react', description: "Video Tags"})
    @Column({type: DataType.STRING})
    tags: string;

    @ApiProperty({example: '1', description: "User Id"})
    @ForeignKey(() => User)
    userId: number;

    @HasMany(() => Like)
    likes: Like[]
}