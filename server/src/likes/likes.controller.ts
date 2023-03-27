import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth-guard';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
    constructor(private likeService: LikesService) {}

    @ApiOperation({summary: "Like Video"})
    @UseGuards(AuthGuard)
    @Post()
    create(@Body() dto: CreateLikeDto) {
        return this.likeService.like(dto)
    }

    @Get('/:videoId')
    get(@Param('videoId') videoId: number) {
        return this.likeService.countAll(videoId)
    }

    @ApiOperation({summary: "Check if video is liked"})
    @UseGuards(AuthGuard)
    @Post('/check')
    check(@Body() dto: CreateLikeDto) {
        return this.likeService.isLiked(dto)
    }
}
