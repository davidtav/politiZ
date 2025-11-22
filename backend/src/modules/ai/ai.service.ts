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
}
