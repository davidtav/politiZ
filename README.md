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
- PostgreSQL (para o banco de dados)
- Redis (opcional, para funcionalidades avançadas)

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/politiZ.git
   cd politiZ
   ```

2. **Configurar e rodar o Backend**
   ```bash
   cd backend
   npm install
   # Configure o arquivo .env com as credenciais do banco de dados
   npx prisma migrate dev
   npm run start:dev
   ```

3. **Configurar e rodar o Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Acessar a aplicação**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:3001`
