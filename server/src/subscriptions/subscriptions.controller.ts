import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth-guard';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './subscriptions.model';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {

    constructor(private subscriptionsService: SubscriptionsService) {}

    @ApiOperation({summary: "Subscribe"})
    @ApiResponse({status: 200, type: Subscription})
    @UseGuards(AuthGuard)
    @Post('/subscribe')
    subscribe(@Body() dto: CreateSubscriptionDto, @Req() req) {
        return this.subscriptionsService.subscribe(dto, req)
    }

    @ApiOperation({summary: "Unsubscribe"})
    @ApiResponse({status: 200, type: Subscription})
    @UseGuards(AuthGuard)
    @Post('/unsubscribe')
    unsubscribe(@Body() dto: CreateSubscriptionDto, @Req() req) {
        return this.subscriptionsService.unsubscribe(dto, req)
    }

    @ApiOperation({summary: "Check if subscribed"})
    @ApiResponse({status: 200, type: Subscription})
    @UseGuards(AuthGuard)
    @Post('/check')
    check(@Body() dto: CreateSubscriptionDto, @Req() req) {
        return this.subscriptionsService.isSubscribed(dto, req)
    }

    @ApiOperation({summary: "Get all user subscriptions"})
    @ApiResponse({status: 200, type: [Subscription]})
    @UseGuards(AuthGuard)
    @Get()
    getAll(@Req() req) {
        return this.subscriptionsService.getUserSubscriptions(req)
    }
}
