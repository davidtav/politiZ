import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('channels')
@Controller('channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  create(@Body() dto: CreateChannelDto) { return this.channelService.create(dto); }

  @Get()
  findAll() { return this.channelService.findAll(); }

  @Post(':id/follow/:userId')
  follow(@Param('userId') userId: string, @Param('id') channelId: string) {
    return this.channelService.follow(userId, channelId);
  }
}
