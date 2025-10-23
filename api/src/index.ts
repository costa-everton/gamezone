const Fastify = require('fastify');
const cors = require('@fastify/cors');
const jwt = require('@fastify/jwt');
const multipart = require('@fastify/multipart');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

// Instanciar Prisma
export const prisma = new PrismaClient();

// Criar instância do Fastify
const fastify = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  },
});

// Registrar plugins
async function registerPlugins() {
  // CORS
  await fastify.register(cors, {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  });

  // JWT
  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
  });

  // Multipart (para upload de arquivos)
  await fastify.register(multipart);
}

// Registrar rotas
async function registerRoutes() {
  // Health check
  fastify.get('/health', async (request: any, reply: any) => {
    return { 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };
  });

  // Rotas de autenticação
  const authRoutes = require('./routes/auth');
  await fastify.register(authRoutes.default, { prefix: '/api/auth' });
  
  // Rotas de jogos
  const gamesRoutes = require('./routes/games');
  await fastify.register(gamesRoutes.default, { prefix: '/api/games' });
  
  // Rotas de usuários
  const usersRoutes = require('./routes/users');
  await fastify.register(usersRoutes.default, { prefix: '/api/users' });
  
  // Rotas de favoritos
  const favoritesRoutes = require('./routes/favorites');
  await fastify.register(favoritesRoutes.default, { prefix: '/api/favorites' });
}

// Função principal
async function start() {
  try {
    // Registrar plugins
    await registerPlugins();
    
    // Registrar rotas
    await registerRoutes();
    
    // Iniciar servidor
    const port = Number(process.env.PORT) || 8000;
    const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
    
    await fastify.listen({ port, host });
    
    console.log(`🚀 Servidor rodando em http://${host}:${port}`);
    console.log(`📊 Health check: http://${host}:${port}/health`);
    console.log(`🔗 API Base URL: http://${host}:${port}/api`);
    
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Encerrando servidor...');
  await fastify.close();
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Encerrando servidor...');
  await fastify.close();
  await prisma.$disconnect();
  process.exit(0);
});

// Iniciar servidor
start();
