# Job de Processamento de Notícias

Sistema automatizado que processa notícias da tabela `News` a cada 30 minutos, resume usando IA (OpenAI), e cria posts no canal "IA Cidadã".

## Funcionamento

### Agendamento Automático
- **Frequência**: A cada 30 minutos
- **Cron Expression**: `0 */30 * * * *`
- **Serviço**: `NewsProcessorService`

### Fluxo de Processamento

1. **Verificação do Canal IA Cidadã**
   - Busca ou cria o canal `ia_cidada` se não existir

2. **Busca de Notícias**
   - Busca todas as notícias com `processed = false`
   - Ordena por data de criação (mais recentes primeiro)

3. **Processamento Individual**
   Para cada notícia não processada:
   - Gera resumo usando IA (método `summarizeNews`)
   - Cria post no canal "IA Cidadã" (não no canal original)
   - Vincula post à notícia via campo `newsId`
   - Marca notícia como processada (`processed = true`, `processedAt = now()`)

4. **Logging e Monitoramento**
   - Logs detalhados de cada etapa
   - Contadores de sucesso e erros
   - Tratamento de erros individual (uma falha não interrompe o processamento)

## Trigger Manual

Para testar ou executar o job manualmente:

```bash
curl -X POST http://localhost:3001/jobs/process-news
```

Ou via Swagger: `POST /jobs/process-news`

## Monitoramento

### Logs do Job

Os logs aparecem no console do backend com emojis para fácil identificação:

- 🤖 Início do processamento
- ✅ Canal IA Cidadã encontrado
- 📰 Notícias encontradas
- 📝 Processando notícia individual
- ✨ Resumo gerado
- ✅ Post criado
- ❌ Erros
- 🎉 Conclusão com estatísticas

### Exemplo de Log

```
🤖 Iniciando processamento de notícias...
✅ Canal IA Cidadã encontrado: cmiaolgzk000110in3m2ljebz
📰 Encontradas 3 notícias para processar
📝 Processando notícia: "Nova lei aprovada" do canal Ibitinga - SP
✨ Resumo gerado: "Projeto de Lei 045/2024 propõe aumentar..."
✅ Post criado com sucesso: post_id_123
🎉 Processamento concluído! Processadas: 3, Erros: 0, Total: 3
```

## Variáveis de Ambiente Necessárias

```env
OPENAI_API_KEY=sk-your-api-key-here
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/politiz
```

## Estrutura do Banco de Dados

### Tabela News (Modificada)
- `processed`: Boolean (default: false)
- `processedAt`: DateTime (nullable)
- Relação: `posts` → Post[]

### Tabela Post (Modificada)
- `newsId`: String (nullable)
- Relação: `news` → News

## Troubleshooting

### Job não está executando

1. Verificar se `JobsModule` está importado no `AppModule`
2. Verificar logs do backend para mensagens de erro
3. Verificar se `@nestjs/schedule` está instalado

### Erros de API da OpenAI

1. Verificar se `OPENAI_API_KEY` está configurada
2. Verificar créditos da conta OpenAI
3. O job tem retry automático (1 tentativa adicional)
4. Fallback: retorna o título da notícia se falhar

### Notícias não sendo processadas

1. Verificar se existem notícias com `processed = false`
2. Executar manualmente via endpoint `/jobs/process-news`
3. Verificar logs para erros específicos

## Custos e Considerações

- Cada notícia processada = 1 chamada à API da OpenAI
- Notícias são marcadas como processadas para evitar duplicação
- Limite de processamento: todas as notícias não processadas por execução
- Para limitar custos, considere adicionar um limite por execução

## Desenvolvimento

### Ajustar Frequência do Cron

Edite `news-processor.service.ts`:

```typescript
// Para teste (a cada minuto)
@Cron('*/1 * * * *')

// Para produção (a cada 30 minutos)
@Cron('0 */30 * * * *')
```

### Adicionar Limite de Processamento

No método `processNews()`, adicione:

```typescript
const unprocessedNews = await this.newsService.findAllUnprocessed();
const newsToProcess = unprocessedNews.slice(0, 10); // Limitar a 10 por execução
```
