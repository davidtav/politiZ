# PolitiZ

O PolitiZ é uma plataforma de engajamento cívico projetada para conectar cidadãos, legisladores e instituições públicas. O objetivo é promover a transparência, a participação popular e o acompanhamento de projetos de lei e iniciativas municipais.

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando uma arquitetura moderna e escalável, dividida em Frontend e Backend.

### Frontend (Web)
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Gerenciamento de Estado**: [Zustand](https://github.com/pmndrs/zustand)
- **Comunicação em Tempo Real**: [Socket.io Client](https://socket.io/)
- **Ícones**: [React Icons](https://react-icons.github.io/react-icons/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)

### Backend (API)
- **Framework**: [NestJS](https://nestjs.com/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados (ORM)**: [Prisma](https://www.prisma.io/) (PostgreSQL)
- **Cache/Filas**: [Redis](https://redis.io/) (ioredis)
- **Websockets**: [Socket.io](https://socket.io/) (Gateway)
- **Documentação**: Swagger (OpenAPI)
- **IA**: [OpenAI](https://openai.com/)

## 📂 Estrutura do Projeto

```bash
politiZ/
├── backend/          # API NestJS
│   ├── src/          # Código fonte do backend
│   ├── prisma/       # Schemas e migrações do banco de dados
│   └── ...
├── frontend/         # Aplicação Next.js
│   ├── app/          # Páginas e rotas (App Router)
│   ├── components/   # Componentes reutilizáveis
│   ├── lib/          # Utilitários e configurações de API
│   └── ...
└── ...
```

## 🛠️ Como Executar

### Pré-requisitos
- Node.js (v18+)
- npm ou yarn
- Docker e Docker Compose (para PostgreSQL e Redis)

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/politiZ.git
   cd politiZ
   ```

2. **Iniciar os containers Docker (PostgreSQL e Redis)**
   
   Navegue até a pasta do backend e execute o Docker Compose:
   ```bash
   cd backend
   docker-compose up -d postgres redis
   ```
   
   Este comando irá:
   - Baixar as imagens do PostgreSQL 15 e Redis 7 (se necessário)
   - Criar e iniciar os containers em background (`-d`)
   - PostgreSQL estará disponível em `localhost:5432`
   - Redis estará disponível em `localhost:6379`
   
   **Comandos úteis do Docker:**
   ```bash
   # Verificar status dos containers
   docker-compose ps
   
   # Ver logs dos containers
   docker-compose logs -f postgres redis
   
   # Parar os containers
   docker-compose stop postgres redis
   
   # Parar e remover os containers
   docker-compose down
   
   # Parar e remover containers + volumes (apaga dados do banco)
   docker-compose down -v
   ```

3. **Configurar e rodar o Backend**
   ```bash
   # Ainda na pasta backend
   npm install
   
   # Configure o arquivo .env com as credenciais (exemplo abaixo)
   # DATABASE_URL="postgresql://postgres:postgres@localhost:5432/politiz"
   # REDIS_URL="redis://localhost:6379"
   # OPENAI_API_KEY="sua-chave-aqui"
   
   # Executar migrations do Prisma
   npx prisma migrate dev
   
   # (Opcional) Popular o banco com dados de exemplo
   npx prisma db seed
   
   # Iniciar o servidor de desenvolvimento
   npm run dev
   ```

4. **Configurar e rodar o Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

5. **Acessar a aplicação**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:3001`
   - Documentação Swagger: `http://localhost:3001/docs`
   - Prisma Studio: Execute `npx prisma studio` na pasta backend → `http://localhost:5555`

## 🐳 Serviços Docker

O projeto utiliza Docker Compose para gerenciar os seguintes serviços:

### PostgreSQL
- **Imagem**: `postgres:15-alpine`
- **Porta**: `5432`
- **Usuário**: `postgres`
- **Senha**: `postgres`
- **Database**: `politiz`
- **Volume**: `pgdata` (persistência de dados)

### Redis
- **Imagem**: `redis:7-alpine`
- **Porta**: `6379`
- **Uso**: Cache e gerenciamento de filas para jobs assíncronos


