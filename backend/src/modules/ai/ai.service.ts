import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { GoogleGenAI } from "@google/genai";

@Injectable()
export class AiService {
    // private client = new OpenAI({
    //     apiKey: process.env.OPENAI_API_KEY,
    // });

    private ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

    async generateResponse(prompt: string) {
        const response = await this.ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return { output: response.text };
    }

    async summarizeNews(news: {
        title: string;
        content: string;
        url: string;
    }): Promise<string> {
        const prompt = `Você é a IA Cidadã, uma assistente que resume notícias políticas de forma clara e objetiva para o público jovem de 16 a 20 anos.

Resuma a seguinte notícia em um único parágrafo curto (máximo 2-3 linhas), usando uma linguagem simples e acessível, focando no impacto direto para os jovens:

Título: ${news.title}
Conteúdo: ${news.content}

Diretrizes:
- Seja extremamente conciso e direto
- Foque no que realmente importa para os jovens
- Use linguagem simples e acessível
- Não use jargões técnicos
- Não inclua "Resumo:" ou similar, vá direto ao ponto
- Mantenha tom neutro e informativo
- Inclua no resumo 'saiba mais em: ${news.url}'

Resumo:`;

        try {
            // const response = await this.client.responses.create({
            //     model: "gpt-5.1",
            //     input: prompt,
            // });

            // return response.output_text.trim();

            const response = await this.ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });

            return response.text || news.title;

        } catch (error) {
            console.error('Erro ao resumir notícia:', error);
            // Em caso de erro retorna o título da notícia
            return news.title;            
        }
    }
}
