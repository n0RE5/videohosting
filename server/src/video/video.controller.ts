import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth-guard';
import { LikesService } from 'src/likes/likes.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { GetUsersVideoDto, SearchVideoDto, VideoDto } from './dto/get-video.dto';
import { Video } from './video.model';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {

    constructor(private videoService: VideoService) {}

    @ApiOperation({summary: "Create Video"})
    @ApiResponse({status: 200, type: Video})
    @UseInterceptors(FilesInterceptor('filez'))
    @UseGuards(AuthGuard)
    @Post()
    create(@Body() videoDto: CreateVideoDto, @UploadedFiles() files, @Req() req) {        
        return this.videoService.create(videoDto, files, req)
    }

    @ApiOperation({summary: "Get Video"})
    @ApiResponse({status: 200, type: Video})
    @Get('/:id')
    get(@Param('id') id: number) {
        return this.videoService.getVideo(id)
    }

    @ApiOperation({summary: "Get Videos From User"})
    @ApiResponse({status: 200, type: [Video]})
    @Post('/user')
    getFromUser(@Body() dto: GetUsersVideoDto) {
        return this.videoService.getUserVideos(dto)
    }

    @ApiOperation({summary: "Get All Videos"})
    @ApiResponse({status: 200, type: [Video]})
    @Post('/videos')
    getAll(@Body() dto: VideoDto) {
        return this.videoService.getVideos(dto)
    }

    @ApiOperation({summary: "Search for videos"})
    @ApiResponse({status: 200, type: [Video]})
    @Post('/search')
    search(@Body() dto: SearchVideoDto) {
        return this.videoService.searchVideos(dto)
    }

    @ApiOperation({summary: "Add video view"})
    @ApiResponse({status: 200, type: Video})
    @Get('/views/:id')
    update(@Param('id') id: number) {
        return this.videoService.addView(id)
    }
}
