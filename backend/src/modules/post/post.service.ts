import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService, private gateway: EventsGateway) {}

  async create(data: CreatePostDto) {
    const post = await this.prisma.post.create({ data });
    this.gateway.feedUpdate(data.channelId, post);
    return post;
  }

  async like(userId: string, postId: string) {
    const like = await this.prisma.postLikes.create({ data: { userId, postId } });
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (post) this.gateway.feedUpdate(post.channelId, post);
    return like;
  }

  feed(channelId?: string) {
    if (channelId) {
      return this.prisma.post.findMany({ where: { channelId }, orderBy: { createdAt: 'desc' } });
    }
    return this.prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
