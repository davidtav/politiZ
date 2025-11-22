import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @Post()
    create(@Body() createNewsDto: CreateNewsDto) {
        return this.newsService.create(createNewsDto);
    }

    @Get()
    findAll(@Query('channelId') channelId?: string) {
        if (channelId) {
            return this.newsService.findByChannel(channelId);
        }
        return this.newsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.newsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
        return this.newsService.update(id, updateNewsDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.newsService.remove(id);
    }
}
