import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() dto: CreatePostDto) { return this.postService.create(dto); }

  @Post(':id/like/:userId')
  like(@Param('userId') userId: string, @Param('id') postId: string) { return this.postService.like(userId, postId); }

  @Get('feed')
  feed() { return this.postService.feed(); }
}
