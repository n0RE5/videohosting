import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth-guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { BansService } from './bans.service';

@Controller('bans')
export class BansController {

    constructor(private banService: BansService){}

    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN", "MODERATOR")
    @Post('/ban')
    ban(@Body() dto: {userId: number, reason: string}) {
        return this.banService.ban(dto)
    }

    @UseGuards(AuthGuard)
    @Get('/:userId')
    getAll(@Param('userId') userId: number) {
        return this.banService.getAllBans(userId)
    }
}
