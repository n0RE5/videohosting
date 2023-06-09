import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { FilesService } from 'src/files/files.service';
import { Like } from 'src/likes/likes.model';
import { CreateVideoDto } from './dto/create-video.dto';
import { GetUsersVideoDto, SearchVideoDto, VideoDto } from './dto/get-video.dto';
import { Video } from './video.model';

@Injectable()
export class VideoService {

    constructor(@InjectModel(Video) private videoRepository: typeof Video, private fileService: FilesService) {}

    async create(dto: CreateVideoDto, files: any, req: any) {
        if (!files.length) {
            throw new HttpException('No files uploaded', HttpStatus.BAD_REQUEST)
        }
        const preview = await this.fileService.createFile(files[0], '.jpg')
        const videoLink = await this.fileService.createFile(files[1], '.mp4')
        const video = await this.videoRepository.create({...dto, video: videoLink, previewImg: preview, userId: req.user.id})
        return video
    }

    async getVideo(id: number) {
        const video = await this.videoRepository.findOne({
            where: {id},
            attributes: {
                include: [[Sequelize.fn('COUNT', Sequelize.col(`likes.id`)), `likesCount`]]
            },
            include: [
                {
                    model: Like,
                    attributes: []
                }
            ],
            group: ['Video.id'],
            order: [['createdAt', 'DESC']]
        })
        return video
    }

    async getUserVideos(dto: GetUsersVideoDto) {
        let offset = dto.page * dto.limit - dto.limit
        let videos;
        if (dto.limit === 0) {
            videos = await this.videoRepository.findAndCountAll({
                where: {userId: dto.userId},
                attributes: {
                    include: [[Sequelize.fn('COUNT', Sequelize.col(`likes.id`)), `likesCount`]]
                },
                include: [
                    {
                        model: Like,
                        attributes: []
                    }
                ],
                group: ['Video.id'],
                order: [['createdAt', 'DESC']]
            })
        } else {
            videos = await this.videoRepository.findAndCountAll({
                where: {userId: dto.userId},
                limit: dto.limit,
                offset: offset,
                attributes: {
                    include: [[Sequelize.fn('COUNT', Sequelize.col(`likes.id`)), `likesCount`]]
                },
                include: [
                    {
                        model: Like,
                        attributes: []
                    }
                ],
                group: ['Video.id'],
                order: [['createdAt', 'DESC']]
            })
        }
        return videos
    }

    async searchVideos(dto: SearchVideoDto) {
        let offset = dto.page * dto.limit - dto.limit
        let videos;
        if (dto.limit === 0) {
            videos = this.videoRepository.findAll({
                where: {title: { [Op.like]: '%' + dto.searchQuery + '%' }},
                order: [['views', 'DESC']]
            })
        } else {
            videos = this.videoRepository.findAll({
                where: {title: { [Op.like]: '%' + dto.searchQuery + '%' }},
                limit: dto.limit,
                offset,
                order: [['views', 'DESC']]
            })
        }
        return videos
    }

    async getVideos(dto: VideoDto) {
        let offset = dto.page * dto.limit - dto.limit
        const videos = this.videoRepository.findAll({
            limit: dto.limit,
            offset,
            order: [['views', 'DESC']]
        })
        return videos
    }

    async addView(id: number) {
        const video = await this.videoRepository.findOne({where: {id}})
        if (!video) {
            throw new HttpException("Video doesn't exists", HttpStatus.BAD_REQUEST)
        }
        await video.update({views: video.views + 1})
        return video
    }
}
