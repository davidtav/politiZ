import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
    private client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    async generateResponse(prompt: string) {
        const response = await this.client.responses.create({
            model: "gpt-5.1",
            input: prompt,
        });

        return { output: response.output_text };
    }

    async summarizeNews(news: {
        title: string;
        content: string;
        url?: string;
    }): Promise<string> {
        const prompt = `Você é a IA Cidadã, uma assistente que resume notícias políticas de forma clara e objetiva para cidadãos.

Resuma a seguinte notícia em um único parágrafo curto (máximo 2-3 linhas), focando no impacto direto para os cidadãos:

Título: ${news.title}
Conteúdo: ${news.content}

Diretrizes:
- Seja extremamente conciso e direto
- Foque no que realmente importa para o cidadão
- Use linguagem simples e acessível
- Não use jargões técnicos
- Não inclua "Resumo:" ou similar, vá direto ao ponto
- Mantenha tom neutro e informativo

Resumo:`;

        try {
            const response = await this.client.responses.create({
                model: "gpt-5.1",
                input: prompt,
            });

            return response.output_text.trim();
        } catch (error) {
            console.error('Erro ao resumir notícia:', error);

            // Retry uma vez em caso de erro
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const response = await this.client.responses.create({
                    model: "gpt-5.1",
                    input: prompt,
                });
                return response.output_text.trim();
            } catch (retryError) {
                console.error('Erro no retry ao resumir notícia:', retryError);
                // Fallback: retornar título se falhar
                return news.title;
            }
        }
    }
}
