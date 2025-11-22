import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NewsService } from '../news/news.service';
import { PostService } from '../post/post.service';
import { ChannelService } from '../channel/channel.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class NewsProcessorService {
    private readonly logger = new Logger(NewsProcessorService.name);

    constructor(
        private newsService: NewsService,
        private postService: PostService,
        private channelService: ChannelService,
        private aiService: AiService,
    ) { }

    // Executa a cada 30 minutos
    @Cron('0 */30 * * * *')
    async processNews() {
        this.logger.log('🤖 Iniciando processamento de notícias...');

        try {
            // Garantir que o canal IA Cidadã existe
            const iaCidadaChannel = await this.channelService.findOrCreateIACidada();
            this.logger.log(`✅ Canal IA Cidadã encontrado: ${iaCidadaChannel.id}`);

            // Buscar todas as notícias não processadas
            const unprocessedNews = await this.newsService.findAllUnprocessed();

            if (unprocessedNews.length === 0) {
                this.logger.log('ℹ️  Nenhuma notícia para processar');
                return;
            }

            this.logger.log(`📰 Encontradas ${unprocessedNews.length} notícias para processar`);

            let processedCount = 0;
            let errorCount = 0;

            // Processar cada notícia
            for (const news of unprocessedNews) {
                try {
                    this.logger.log(`📝 Processando notícia: "${news.title}" do canal ${news.channel.name}`);

                    // Resumir notícia usando IA
                    const summary = await this.aiService.summarizeNews({
                        title: news.title,
                        content: news.content,
                        url: news.url || undefined,
                    });

                    this.logger.log(`✨ Resumo gerado: "${summary.substring(0, 100)}..."`);

                    // Criar post no canal IA Cidadã
                    const post = await this.postService.createFromNews(
                        iaCidadaChannel.id,
                        summary,
                        news.id,
                    );

                    // Marcar notícia como processada
                    await this.newsService.markAsProcessed(news.id, post.id);

                    processedCount++;
                    this.logger.log(`✅ Post criado com sucesso: ${post.id}`);

                } catch (error) {
                    errorCount++;
                    this.logger.error(`❌ Erro ao processar notícia ${news.id}:`, error);
                    // Continuar processando outras notícias mesmo se uma falhar
                }
            }

            this.logger.log(
                `🎉 Processamento concluído! ` +
                `Processadas: ${processedCount}, Erros: ${errorCount}, Total: ${unprocessedNews.length}`
            );

        } catch (error) {
            this.logger.error('❌ Erro crítico no processamento de notícias:', error);
        }
    }

    // Método para trigger manual (útil para testes)
    async processNewsManually() {
        this.logger.log('🔧 Processamento manual iniciado');
        return this.processNews();
    }
}
