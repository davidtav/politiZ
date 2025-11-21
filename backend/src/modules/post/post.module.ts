import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../../prisma.service';
import { EventsGateway } from '../events/events.gateway';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, EventsGateway],
  exports: [PostService]
})
export class PostModule {}
