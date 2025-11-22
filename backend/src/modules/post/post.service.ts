import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePostDto, CreatePollDto, CreatePollOptionDto } from './dto';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService, private gateway: EventsGateway) { }

  async create(data: CreatePostDto) {
    // Se o post tem uma enquete, criar o post com a enquete e suas opções
    if (data.poll) {
      const post = await this.prisma.post.create({
        data: {
          channelId: data.channelId,
          title: data.title,
          content: data.content || '',
          image: data.image,
          poll: {
            create: {
              question: data.poll.question,
              endsAt: new Date(data.poll.endsAt),
              options: {
                create: data.poll.options.map(option => ({
                  text: option.text,
                  icon: option.icon,
                })),
              },
            },
          },
        },
        include: {
          channel: true,
          likes: true,
          poll: {
            include: {
              options: true,
              votes: true,
            },
          },
        },
      });

      this.gateway.feedUpdate(data.channelId, post);
      return post;
    }

    // Post normal sem enquete
    const post = await this.prisma.post.create({
      data: {
        channelId: data.channelId,
        title: data.title,
        content: data.content!,
        image: data.image,
      },
      include: {
        channel: true,
        likes: true,
      },
    });

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
    const include = {
      channel: true,
      likes: true,
      poll: {
        include: {
          options: true,
          votes: true,
        },
      },
    };

    if (channelId) {
      return this.prisma.post.findMany({
        where: { channelId },
        orderBy: { createdAt: 'desc' },
        include,
      });
    }

    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include,
    });
  }

  /**
   * Registra um voto em uma enquete
   */
  async voteOnPoll(userId: string, pollId: string, optionId: string) {
    // Verificar se o usuário já votou nesta enquete
    const existingVote = await this.prisma.pollVote.findUnique({
      where: {
        userId_pollId: {
          userId,
          pollId,
        },
      },
    });

    if (existingVote) {
      // Se já votou, atualizar o voto
      const vote = await this.prisma.pollVote.update({
        where: { id: existingVote.id },
        data: { optionId },
      });

      // Retornar a enquete atualizada
      return this.prisma.poll.findUnique({
        where: { id: pollId },
        include: {
          options: true,
          votes: true,
        },
      });
    }

    // Criar novo voto
    await this.prisma.pollVote.create({
      data: {
        userId,
        pollId,
        optionId,
      },
    });

    // Retornar a enquete atualizada
    return this.prisma.poll.findUnique({
      where: { id: pollId },
      include: {
        options: true,
        votes: true,
      },
    });
  }

  /**
   * Cria um post a partir de uma notícia processada pela IA
   * Todos os posts criados por este método são atribuídos ao canal "IA Cidadã"
   */
  async createFromNews(iaCidadaChannelId: string, content: string, newsId: string) {
    const post = await this.prisma.post.create({
      data: {
        channelId: iaCidadaChannelId,
        content,
        newsId,
        title: null,
        image: null,
      },
      include: {
        channel: true,
        likes: true,
        news: {
          include: {
            channel: true,
          },
        },
      },
    });

    // Notificar via WebSocket
    this.gateway.feedUpdate(iaCidadaChannelId, post);

    return post;
  }
}
