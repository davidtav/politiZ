import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { PostService } from '../post/post.service';
import { ExplainImpactDto } from './dto/explain-impact.dto';

@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly postService: PostService,
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
}