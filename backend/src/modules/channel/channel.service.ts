import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateChannelDto } from './dto/create-channel.dto';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateChannelDto) {
    return this.prisma.channel.create({ data });
  }

  findAll() {
    return this.prisma.channel.findMany({ include: { posts: true } });
  }

  follow(userId: string, channelId: string) {
    return this.prisma.channelFollowers.create({ data: { userId, channelId } });
  }
}
