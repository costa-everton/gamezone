# 🗄️ Configuração do Banco de Dados GameHub

## 📋 Pré-requisitos

### 1. **PostgreSQL**
- **Download**: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
- **Versão recomendada**: 14+ ou 15+
- **Porta padrão**: 5432

### 2. **Node.js** (já instalado)
- **Versão**: 18+ (recomendado 20+)
- **Verificar**: `node --version`

## 🚀 Configuração Passo a Passo

### **Passo 1: Instalar PostgreSQL**

#### **Windows:**
1. Baixar o instalador do PostgreSQL
2. Executar o instalador
3. Definir senha para usuário `postgres`
4. Anotar a porta (padrão: 5432)

#### **Verificar instalação:**
```bash
psql --version
```

### **Passo 2: Criar Banco de Dados**

#### **Conectar ao PostgreSQL:**
```bash
psql -U postgres -h localhost
```

#### **Criar banco de dados:**
```sql
CREATE DATABASE gamehub;
\q
```

### **Passo 3: Configurar Variáveis de Ambiente**

#### **Criar arquivo .env:**
```bash
# No diretório api/
echo 'DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/gamehub?schema=public"' > .env
echo 'JWT_SECRET="gamehub_super_secret_jwt_key_2025_development"' >> .env
echo 'JWT_ACCESS_EXPIRES_IN="7d"' >> .env
echo 'JWT_REFRESH_EXPIRES_IN="30d"' >> .env
```

#### **Ou criar manualmente:**
```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/gamehub?schema=public"
JWT_SECRET="gamehub_super_secret_jwt_key_2025_development"
JWT_ACCESS_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"
```

**⚠️ IMPORTANTE**: Substitua `SUA_SENHA` pela senha do PostgreSQL que você definiu.

### **Passo 4: Executar Migrações**

#### **Instalar dependências (se não instalado):**
```bash
cd api
npm install
```

#### **Executar migrações:**
```bash
npx prisma migrate dev --name init
```

#### **Gerar cliente Prisma:**
```bash
npx prisma generate
```

### **Passo 5: Popular Banco com Dados de Teste**

#### **Criar arquivo de seed:**
```bash
# Criar diretório seeds
mkdir prisma/seeds
```

#### **Criar seed.js:**
```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Ação',
        slug: 'acao',
        description: 'Jogos de ação e aventura'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Estratégia',
        slug: 'estrategia',
        description: 'Jogos de estratégia e tática'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Puzzle',
        slug: 'puzzle',
        description: 'Jogos de quebra-cabeça e lógica'
      }
    })
  ]);

  console.log('✅ Categorias criadas:', categories.length);

  // Criar jogos
  const games = await Promise.all([
    prisma.game.create({
      data: {
        title: 'Stellar Battle',
        slug: 'stellar-battle',
        shortDescription: 'Batalha espacial épica',
        description: 'Um jogo de batalha espacial onde você pilota uma nave e combate inimigos no espaço sideral.',
        category: 'Ação',
        image: '/games/stellar-battle/cover.jpg',
        difficulty: 'Médio',
        playTime: '30 min',
        tags: ['espaço', 'ação', 'nave'],
        featured: true,
        new: true
      }
    }),
    prisma.game.create({
      data: {
        title: 'Space Odyssey',
        slug: 'space-odyssey',
        shortDescription: 'Aventura espacial',
        description: 'Explore galáxias distantes e descubra segredos cósmicos.',
        category: 'Aventura',
        image: '/games/space-odyssey/cover.jpg',
        difficulty: 'Fácil',
        playTime: '45 min',
        tags: ['espaço', 'aventura', 'exploração'],
        featured: false,
        new: true
      }
    }),
    prisma.game.create({
      data: {
        title: 'Cyber Racer',
        slug: 'cyber-racer',
        shortDescription: 'Corrida futurista',
        description: 'Corra pelas ruas cyberpunk em veículos futuristas.',
        category: 'Corrida',
        image: '/games/cyber-racer/cover.jpg',
        difficulty: 'Difícil',
        playTime: '20 min',
        tags: ['corrida', 'futuro', 'velocidade'],
        featured: true,
        new: false
      }
    })
  ]);

  console.log('✅ Jogos criados:', games.length);

  // Criar usuário admin
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin GameHub',
      email: 'admin@gamehub.com',
      password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KzKz2O', // password: admin123
      isAdmin: true
    }
  });

  console.log('✅ Usuário admin criado:', adminUser.email);

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

#### **Executar seed:**
```bash
node prisma/seeds/seed.js
```

### **Passo 6: Testar Conexão**

#### **Iniciar servidor:**
```bash
npm run dev
```

#### **Testar endpoints:**
```bash
# Health check
curl http://localhost:8000/health

# Listar jogos
curl http://localhost:8000/api/games

# Listar categorias
curl http://localhost:8000/api/games/categories
```

## 🔧 Comandos Úteis

### **Prisma:**
```bash
# Ver status do banco
npx prisma db status

# Resetar banco (CUIDADO!)
npx prisma migrate reset

# Visualizar banco
npx prisma studio

# Gerar cliente
npx prisma generate
```

### **PostgreSQL:**
```bash
# Conectar
psql -U postgres -h localhost -d gamehub

# Listar tabelas
\dt

# Ver estrutura de uma tabela
\d users

# Sair
\q
```

## 🐛 Solução de Problemas

### **Erro de conexão:**
- Verificar se PostgreSQL está rodando
- Verificar credenciais no .env
- Verificar se o banco "gamehub" existe

### **Erro de migração:**
- Verificar se o banco está vazio
- Executar `npx prisma migrate reset` (CUIDADO!)

### **Erro de permissão:**
- Verificar se o usuário postgres tem permissões
- Verificar se a senha está correta

## 📊 Estrutura do Banco

### **Tabelas:**
- `users` - Usuários do sistema
- `games` - Jogos disponíveis
- `categories` - Categorias de jogos
- `game_favorites` - Favoritos dos usuários
- `play_sessions` - Sessões de jogo

### **Relacionamentos:**
- User → GameFavorite (1:N)
- User → PlaySession (1:N)
- Game → GameFavorite (1:N)
- Game → PlaySession (1:N)

## ✅ Verificação Final

Após seguir todos os passos, você deve ter:

1. ✅ PostgreSQL instalado e rodando
2. ✅ Banco "gamehub" criado
3. ✅ Arquivo .env configurado
4. ✅ Migrações executadas
5. ✅ Dados de teste inseridos
6. ✅ Servidor rodando na porta 8000
7. ✅ Endpoints respondendo corretamente

**🎉 Parabéns! Seu banco de dados está configurado e funcionando!**
