import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { GoogleGenAI } from "@google/genai";

@Injectable()
export class AiService {
    // private client = new OpenAI({
    //     apiKey: process.env.OPENAI_API_KEY,
    // });

    private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

    async explainNewsImpact(newsContent: {
        title: string;
        content: string;
        category: string;
    }): Promise<{
        simple: string;
        storytelling: string;
        futureProjection: string;
    }> {
        // Prompt template armazenado no backend (seguro)
        const prompt = `Você é a IA Cidadã, uma assistente que explica notícias políticas de forma acessível.

Analise a seguinte notícia e explique em 3 formatos diferentes como ela afeta uma pessoa que mora em "IBITINGA" e tem "entre 16 e 20 anos", considerando o impacto no bolso, na rotina e na família:

Título: ${newsContent.title}
Categoria: ${newsContent.category}
Conteúdo: ${newsContent.content}

Forneça 3 explicações separadas usando EXATAMENTE este formato:

### LINGUAGEM SIMPLES
[Explique de forma direta e objetiva, usando palavras simples. Máximo 3 parágrafos curtos.]

### LINGUAGEM STORYTELLING
[Conte uma história curta mostrando como isso afetaria o dia a dia de um jovem de Ibitinga. Máximo 3 parágrafos.]

### PROJEÇÃO FUTURA (10 ANOS)
[Mostre cenários positivos e negativos se o projeto for aprovado. Use subtítulos "Benefícios:" e "Malefícios:" e liste em tópicos.]

IMPORTANTE: Use exatamente os marcadores ### acima para separar as seções. Não adicione texto antes ou depois das seções.`;

        try {
            const response = await this.ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });

            const text = response.text || '';

            // Parse da resposta para extrair as 3 seções
            const sections = this.parseImpactExplanation(text);

            return sections;

        } catch (error) {
            console.error('Erro ao explicar impacto da notícia:', error);
            // Retorna explicações padrão em caso de erro
            return {
                simple: 'Não foi possível gerar a explicação no momento. Tente novamente mais tarde.',
                storytelling: 'Não foi possível gerar a explicação no momento. Tente novamente mais tarde.',
                futureProjection: 'Não foi possível gerar a explicação no momento. Tente novamente mais tarde.',
            };
        }
    }

    private parseImpactExplanation(text: string): {
        simple: string;
        storytelling: string;
        futureProjection: string;
    } {
        // Extrair as seções usando os marcadores ###
        const simpleMatch = text.match(/### LINGUAGEM SIMPLES\s*([\s\S]*?)(?=###|$)/);
        const storytellingMatch = text.match(/### LINGUAGEM STORYTELLING\s*([\s\S]*?)(?=###|$)/);
        const futureMatch = text.match(/### PROJEÇÃO FUTURA \(10 ANOS\)\s*([\s\S]*?)(?=###|$)/);

        return {
            simple: simpleMatch ? simpleMatch[1].trim() : 'Conteúdo não disponível.',
            storytelling: storytellingMatch ? storytellingMatch[1].trim() : 'Conteúdo não disponível.',
            futureProjection: futureMatch ? futureMatch[1].trim() : 'Conteúdo não disponível.',
        };
    }

    async analyzePoliticalBias(newsContent: {
        title: string;
        content: string;
        category: string;
    }): Promise<{
        analysis: string;
        summary: string;
    }> {
        // Prompt template armazenado no backend (seguro)
        const prompt = `Você é a IA Cidadã, uma assistente que analisa conteúdo político de forma imparcial e educativa.

Analise o seguinte conteúdo e identifique possíveis vieses políticos:

Título: ${newsContent.title}
Categoria: ${newsContent.category}
Conteúdo: ${newsContent.content}

INSTRUÇÕES PARA ANÁLISE:

1. IDENTIFICAÇÃO DO AUTOR
   - Identifique sempre que possível o autor do projeto/notícia
   - Mencione sua função pública (ex: vereador, deputado, prefeito)
   - Identifique seu partido político

2. HISTÓRICO DO AUTOR
   - Verifique quando possível se o autor já falou publicamente sobre esse tema no passado
   - Mencione discursos, entrevistas ou postagens em redes sociais relacionadas
   - Identifique se o autor já votou ou apoiou projetos semelhantes

3. INTERESSES OCULTOS
   - Explique possíveis motivações políticas por trás do texto
   - Identifique grupos ou setores que podem se beneficiar
   - Aponte possíveis conflitos de interesse

4. IMPACTO EM IBITINGA
   - Mostre quem GANHA com a proposta (setores, grupos, empresas)
   - Mostre quem PERDE com a proposta (setores, grupos, população)
   - Foque na realidade local de Ibitinga (SP)

5. LINGUAGEM ACESSÍVEL
   - Use linguagem simples e direta
   - Evite jargões políticos ou jurídicos
   - Adapte para compreensão de jovens de 16-20 anos

FORMATO DE RESPOSTA:

### ANÁLISE DETALHADA
[Apresente aqui a análise completa seguindo os 4 pontos acima. Use parágrafos bem estruturados e subtítulos quando necessário.]

### RESUMO DO VIÉS
[Apresente um resumo objetivo de 2-3 parágrafos explicando o viés principal encontrado e as principais conclusões da análise.]

IMPORTANTE: Use exatamente os marcadores ### acima para separar as seções. Não adicione texto antes ou depois das seções.`;

        try {
            const response = await this.ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });

            const text = response.text || '';

            // Parse da resposta para extrair as 2 seções
            const sections = this.parseBiasAnalysis(text);

            return sections;

        } catch (error) {
            console.error('Erro ao analisar viés político:', error);
            // Retorna análise padrão em caso de erro
            return {
                analysis: 'Não foi possível gerar a análise no momento. Tente novamente mais tarde.',
                summary: 'Não foi possível gerar o resumo no momento. Tente novamente mais tarde.',
            };
        }
    }

    private parseBiasAnalysis(text: string): {
        analysis: string;
        summary: string;
    } {
        // Extrair as seções usando os marcadores ###
        const analysisMatch = text.match(/### ANÁLISE DETALHADA\s*([\s\S]*?)(?=###|$)/);
        const summaryMatch = text.match(/### RESUMO DO VIÉS\s*([\s\S]*?)(?=###|$)/);

        return {
            analysis: analysisMatch ? analysisMatch[1].trim() : 'Conteúdo não disponível.',
            summary: summaryMatch ? summaryMatch[1].trim() : 'Conteúdo não disponível.',
        };
    }
}
