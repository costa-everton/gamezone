# GameHub API

Backend da aplicação GameHub - Marketplace de jogos.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Fastify** - Framework web rápido e eficiente
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação e autorização
- **Zod** - Validação de dados

## 📁 Estrutura do Projeto

```
api/
├── src/
│   ├── controllers/     # Controladores da aplicação
│   ├── services/        # Serviços de negócio
│   ├── models/          # Modelos de dados
│   ├── routes/          # Rotas da API
│   ├── middleware/      # Middlewares
│   ├── utils/           # Utilitários
│   └── types/           # Tipos TypeScript
├── prisma/
│   └── schema.prisma    # Schema do banco de dados
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Instalação

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   ```bash
   cp env.example .env
   ```
   
   Edite o arquivo `.env` com suas configurações:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/gamehub?schema=public"
   JWT_SECRET="your-super-secret-jwt-key"
   JWT_EXPIRES_IN="7d"
   JWT_REFRESH_EXPIRES_IN="30d"
   PORT=8000
   NODE_ENV="development"
   CORS_ORIGIN="http://localhost:5173"
   ```

3. **Configurar banco de dados:**
   ```bash
   # Gerar cliente Prisma
   npm run db:generate
   
   # Aplicar migrações
   npm run db:migrate
   ```

## 🚀 Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## 📊 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento com hot reload
- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Executa a aplicação compilada
- `npm run db:generate` - Gera cliente Prisma
- `npm run db:push` - Aplica mudanças no banco sem migração
- `npm run db:migrate` - Executa migrações do banco
- `npm run db:studio` - Abre Prisma Studio

## 🔗 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Renovar tokens
- `POST /api/auth/logout` - Logout
- `POST /api/auth/forgot-password` - Esqueci senha
- `POST /api/auth/reset-password` - Redefinir senha

### Jogos
- `GET /api/games` - Listar jogos (com paginação e filtros)
- `GET /api/games/:slug` - Buscar jogo por slug
- `POST /api/games` - Criar jogo (admin)
- `PUT /api/games/:id` - Atualizar jogo (admin)
- `DELETE /api/games/:id` - Excluir jogo (admin)
- `GET /api/games/categories` - Listar categorias
- `GET /api/games/featured` - Jogos em destaque
- `GET /api/games/new` - Jogos novos

### Usuários
- `GET /api/users/profile` - Perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil
- `PUT /api/users/password` - Alterar senha
- `GET /api/users/play-sessions` - Sessões de jogo
- `POST /api/users/play-sessions` - Registrar sessão
- `GET /api/users/stats` - Estatísticas do usuário

### Favoritos
- `GET /api/favorites` - Listar favoritos
- `POST /api/favorites` - Adicionar favorito
- `DELETE /api/favorites/:gameId` - Remover favorito
- `GET /api/favorites/check/:gameId` - Verificar se é favorito
- `GET /api/favorites/count` - Contar favoritos

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação:

1. **Login/Registro** - Retorna access token e refresh token
2. **Access Token** - Usado para autenticar requisições (expira em 7 dias)
3. **Refresh Token** - Usado para renovar access token (expira em 30 dias)

### Como usar:
```bash
# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Usar token em requisições
curl -X GET http://localhost:8000/api/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🗄️ Banco de Dados

### Modelos Principais

- **User** - Usuários do sistema
- **Game** - Jogos disponíveis
- **GameFavorite** - Favoritos dos usuários
- **PlaySession** - Sessões de jogo
- **Category** - Categorias de jogos

### Relacionamentos

- User → GameFavorite (1:N)
- User → PlaySession (1:N)
- Game → GameFavorite (1:N)
- Game → PlaySession (1:N)

## 🧪 Testes

```bash
# Executar testes (quando implementados)
npm test
```

## 📝 Logs

A aplicação usa o logger do Fastify com diferentes níveis:
- **Development**: `info` e acima
- **Production**: `warn` e acima

## 🚀 Deploy

### Railway (Recomendado)
1. Conectar repositório ao Railway
2. Configurar variáveis de ambiente
3. Deploy automático

### Docker
```bash
# Build da imagem
docker build -t gamehub-api .

# Executar container
docker run -p 8000:8000 gamehub-api
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
