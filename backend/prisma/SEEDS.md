# Seeds do Banco de Dados

Este arquivo documenta os seeds disponíveis para popular o banco de dados.

## Como executar o seed

```bash
npm run prisma:seed
```

## Channels criados

### 1. Canal Ibitinga - SP
- **Name**: `ibitinga_sp_channel`
- **Description**: Canal Ibitinga - SP
- **Avatar**: `null`
- **Category**: `municipal`

## Como adicionar novos channels

Edite o arquivo `prisma/seed.ts` e adicione novos channels usando o método `upsert`:

```typescript
const novoChannel = await prisma.channel.upsert({
  where: { name: 'nome_do_channel' },
  update: {},
  create: {
    name: 'nome_do_channel',
    description: 'Descrição do canal',
    avatar: null, // ou URL da imagem
    category: 'municipal', // ou outra categoria
  },
});
```

## Observações

- O método `upsert` é usado para evitar duplicação de dados em execuções subsequentes
- O campo `name` é único, então use-o como identificador no `where`
- Execute `npm run prisma:seed` sempre que adicionar novos dados ao seed
