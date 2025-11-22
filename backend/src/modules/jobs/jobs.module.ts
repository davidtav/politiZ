import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NewsProcessorService } from './news-processor.service';
import { JobsController } from './jobs.controller';
import { NewsModule } from '../news/news.module';
import { PostModule } from '../post/post.module';
import { ChannelModule } from '../channel/channel.module';
import { AiModule } from '../ai/ai.module';
import { PrismaService } from '../../prisma.service';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        NewsModule,
        PostModule,
        ChannelModule,
        AiModule,
    ],
    controllers: [JobsController],
    providers: [NewsProcessorService, PrismaService],
    exports: [NewsProcessorService],
})
export class JobsModule { }
