import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
    constructor(private prisma: PrismaService) { }

    create(createNewsDto: CreateNewsDto) {
        return (this.prisma as any).news.create({
            data: createNewsDto,
        });
    }

    findAll() {
        return (this.prisma as any).news.findMany({
            include: {
                channel: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findByChannel(channelId: string) {
        return (this.prisma as any).news.findMany({
            where: { channelId },
            include: {
                channel: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    findOne(id: string) {
        return (this.prisma as any).news.findUnique({
            where: { id },
            include: {
                channel: true,
            },
        });
    }

    update(id: string, updateNewsDto: UpdateNewsDto) {
        return (this.prisma as any).news.update({
            where: { id },
            data: updateNewsDto,
        });
    }

    remove(id: string) {
        return (this.prisma as any).news.delete({
            where: { id },
        });
    }
}
