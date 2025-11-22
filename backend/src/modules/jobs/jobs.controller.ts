import { Controller, Post } from '@nestjs/common';
import { NewsProcessorService } from './news-processor.service';

@Controller('jobs')
export class JobsController {
    constructor(private readonly newsProcessor: NewsProcessorService) { }

    @Post('process-news')
    async triggerNewsProcessing() {
        await this.newsProcessor.processNewsManually();
        return { message: 'Job de processamento de notícias iniciado manualmente' };
    }
}
