import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { ChannelModule } from './modules/channel/channel.module';
import { PostModule } from './modules/post/post.module';
import { NotificationModule } from './modules/notification/notification.module';
import { EventsGateway } from './modules/events/events.gateway';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis.service';

import { NewsModule } from './modules/news/news.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ChannelModule,
    PostModule,
    NotificationModule,
    NewsModule,
    AiModule,
  ],
  providers: [EventsGateway, PrismaService, RedisService],
})
export class AppModule { }
