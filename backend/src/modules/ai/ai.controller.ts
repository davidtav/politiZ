import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { AiService } from './ai.service';
import { PostService } from '../post/post.service';
import { ExplainImpactDto } from './dto/explain-impact.dto';
import { AnalyzeBiasDto } from './dto/analyze-bias.dto';
import { PrismaService } from '../../prisma.service';

@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly postService: PostService,
    private readonly prisma: PrismaService,
  ) { }

  @Post('generate')
  generate(@Body() body: { prompt: string }) {
    return this.aiService.generateResponse(body.prompt);
  }

  @Post('explain-impact')
  async explainImpact(@Body() dto: ExplainImpactDto) {
    // Buscar o post pelo ID
    const post = await this.postService.findOne(dto.postId);

    if (!post) {
      throw new Error('Post não encontrado');
    }

    // Extrair dados necessários
    const newsContent = {
      title: post.title || 'Sem título',
      content: post.content,
      category: post.category || 'Outros assuntos',
    };

    // Chamar o serviço de IA para gerar as explicações
    const explanation = await this.aiService.explainNewsImpact(newsContent);

    return explanation;
  }

  @Post('analyze-bias')
  async analyzeBias(@Body() dto: AnalyzeBiasDto) {
    // Buscar o post pelo ID
    const post = await this.postService.findOne(dto.postId);

    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    let newsContent: {
      title: string;
      content: string;
      category: string;
    };

    // Se o post tem newsId, buscar o conteúdo integral da notícia
    if (post.newsId) {
      const news = await this.prisma.news.findUnique({
        where: { id: post.newsId },
      });

      if (news) {
        newsContent = {
          title: news.title,
          content: news.content, // Conteúdo integral da notícia
          category: news.category,
        };
      } else {
        // Fallback: usar conteúdo do post se a notícia não for encontrada
        newsContent = {
          title: post.title || 'Sem título',
          content: post.content,
          category: post.category || 'Outros assuntos',
        };
      }
    } else {
      // Post sem newsId: usar conteúdo do próprio post
      newsContent = {
        title: post.title || 'Sem título',
        content: post.content,
        category: post.category || 'Outros assuntos',
      };
    }

    // Chamar o serviço de IA para gerar a análise de viés
    const biasAnalysis = await this.aiService.analyzePoliticalBias(newsContent);

    return biasAnalysis;
  }
}