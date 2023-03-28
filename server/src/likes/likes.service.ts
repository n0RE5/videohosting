import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './likes.model';

@Injectable()
export class LikesService {

    constructor(@InjectModel(Like) private likeRepository: typeof Like) {}

    async like(dto: CreateLikeDto, req: any) {
        const candidate = await this.likeRepository.findOne({where: {userId: req.user.id, videoId: dto.videoId}})
        if (candidate) {
            throw new HttpException("You already liked this video", HttpStatus.BAD_REQUEST)
        }
        const like = await this.likeRepository.create(dto)
        return like
    }

    async countAll(videoId: number) {
        const likes = await this.likeRepository.count({where: {videoId}})
        return likes
    }

    async isLiked(dto: CreateLikeDto, req: any) {
        const candidate = await this.likeRepository.findOne({where: {userId: req.user.id, videoId: dto.videoId}})
        if (!candidate) {
            return false
        }
        return true
    }
}
