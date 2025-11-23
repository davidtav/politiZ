import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { PostModule } from '../post/post.module';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [PostModule],
  controllers: [AiController],
  providers: [AiService, PrismaService],
  exports: [AiService],
})
export class AiModule { }
