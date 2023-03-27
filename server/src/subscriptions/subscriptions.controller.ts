import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
    subscribe(@Body() dto: CreateSubscriptionDto) {
        return this.subscriptionsService.subscribe(dto)
    }

    @ApiOperation({summary: "Unsubscribe"})
    @ApiResponse({status: 200, type: Subscription})
    @UseGuards(AuthGuard)
    @Post('/unsubscribe')
    unsubscribe(@Body() dto: CreateSubscriptionDto) {
        return this.subscriptionsService.unsubscribe(dto)
    }

    @ApiOperation({summary: "Check if subscribed"})
    @ApiResponse({status: 200, type: Subscription})
    @UseGuards(AuthGuard)
    @Post('/check')
    check(@Body() dto: CreateSubscriptionDto) {
        return this.subscriptionsService.isSubscribed(dto)
    }
}
